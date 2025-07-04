import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { CreateShowtimeDto } from './dto/create-showtime.dto'
import { BaseService } from '~/shared/base/base.service'
import { Showtime } from '~/modules/showtime/entities/showtime.entity'
import { IShowtimeService } from '~/modules/showtime/interfaces/showtime.service.interface'
import { IShowtimeRepository } from '~/modules/showtime/interfaces/showtime.repository.interface'
import { SeatRepository } from '~/modules/seat/repositories/seat.repository'
import { Seat } from '~/modules/seat/entities/seat.entity'
import { DeepPartial, In, Not } from 'typeorm'
import { MovieRepository } from '~/modules/movie/repositories/movie.repository'
import { ReservationSeatRepository } from '~/modules/reservation_seat/repositories/reservation_seat.repository'

@Injectable()
export class ShowtimeService extends BaseService<Showtime> implements IShowtimeService {
  constructor(
    @Inject('ShowtimeRepositoryInterface')
    private readonly showtimeRepo: IShowtimeRepository
  ) {
    super(showtimeRepo)
  }
  @Inject('SeatRepositoryInterface')
  private readonly seatRepo: SeatRepository
  @Inject('IMovieRepository')
  private readonly movieRepo: MovieRepository
  @Inject('IReserSeatRepository')
  private readonly reserSeat: ReservationSeatRepository

  async create(createShowtimeDto: CreateShowtimeDto): Promise<Showtime> {
    const { capacity, movieId, start_time, ...rest } = createShowtimeDto
    const next7Days = new Date(Date.now() + 3600 * 1000 * 24 * 7)
    const startTime = new Date(createShowtimeDto.start_time)

    const movie = await this.movieRepo.findOneById(movieId)
    if (startTime < next7Days) {
      throw new BadRequestException('Showtime must be scheduled at least 7 days in advance.')
    }

    const showtime = await this.showtimeRepo.create({ ...createShowtimeDto, movie } as DeepPartial<Showtime>)

    Array.from({ length: capacity }).map(
      async (_, index) =>
        await this.seatRepo.create({
          seat_name: `Seat ${index + 1}`,
          showtime
        } as DeepPartial<Seat>)
    )

    return showtime
  }

  async findSeatsAvailableOfShowtime(showtime_id: string) {
    const seatsResered = await this.reserSeat.findAll({
      relations: {
        seat: true
      },
      where: {
        showtime_id
      },
      select: {
        seat: {
          id: true
        }
      }
    })
    return this.seatRepo.findAll({
      relations: {
        showtime: true
      },
      select: {
        showtime: {
          id: true
        }
      },
      where: {
        showtime: [
          {
            id: showtime_id
          },
          {
            id: Not(In(seatsResered.items.map((item) => item.seat.id)))
          }
        ]
      }
    })
  }

  async findSeatsBelongShowtime(showtime_id: string) {
    return await this.seatRepo.findAll({
      relations: {
        showtime: true
      },
      select: {
        showtime: {
          id: true
        }
      },
      where: {
        showtime: {
          id: showtime_id
        }
      }
    })
  }
}
