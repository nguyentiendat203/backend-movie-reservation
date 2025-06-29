import { Inject, Injectable } from '@nestjs/common'
import { CreateShowtimeDto } from './dto/create-showtime.dto'
import { UpdateShowtimeDto } from './dto/update-showtime.dto'
import { BaseService } from '~/shared/base/base.service'
import { Showtime } from '~/modules/showtime/entities/showtime.entity'
import { IShowtimeService } from '~/modules/showtime/interfaces/showtime.service.interface'
import { IShowtimeRepository } from '~/modules/showtime/interfaces/showtime.repository.interface'
import { ISeatRepository } from '~/modules/seat/interfaces/seat.repository.interface'
import { SeatRepository } from '~/modules/seat/repositories/seat.repository'
import { Seat } from '~/modules/seat/entities/seat.entity'
import { DeepPartial } from 'typeorm'

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

  async create(createShowtimeDto: CreateShowtimeDto): Promise<Showtime> {
    const { capacity, ...rest } = createShowtimeDto

    const seats = Array.from({ length: capacity }).map((_, index) => ({
      seat_name: `Seat ${index + 1}`
    }))
    await this.seatRepo.insertMany(seats)

    const showtime = this.showtimeRepo.create({ ...createShowtimeDto, seats: seats })
    return showtime
  }
  // async findAllShowtimeOfMovie(movie_id: string) {
  //   return await db.query.Showtime.findMany({
  //     where: (Showtime, { eq, and, isNull }) => and(eq(Showtime.movie_id, movie_id), isNull(Showtime.deleted_at))
  //   })
  // }
  // async findSeatsAvailableOfShowtime(showtime_id: string) {
  //   const seatsResered = await db.query.Reservation_Seat.findMany({
  //     columns: {
  //       seat_id: true
  //     }
  //   })
  //   return await db.query.Seat.findMany({
  //     with: {
  //       showtime: true
  //     },
  //     where: (Seat, { and, eq, notInArray }) =>
  //       and(
  //         eq(Seat.showtime_id, showtime_id),
  //         notInArray(
  //           Seat.id,
  //           seatsResered.map((item) => item.seat_id)
  //         )
  //       )
  //   })
  // }
  async findSeatsBelongShowtime(showtime_id: string) {
    // return await db.query.Seat.findMany({
    //   where: (Seat, { eq }) => eq(Seat.showtime_id, showtime_id)
    // })
  }
  // async findAll() {
  //   return await db.select().from(Showtime).where(isNull(Showtime.deleted_at))
  // }
  // async findOne(showtime_id: string) {
  //   const showtime = await db.query.Showtime.findFirst({
  //     where: (Showtime, { eq }) => eq(Showtime.id, showtime_id)
  //   })
  //   const seats = await db.query.Seat.findMany({
  //     where: (Seat, { eq }) => eq(Seat.showtime_id, showtime_id)
  //   })
  //   return { ...showtime, seats }
  // }
  // async update(id: string, updateShowtimeDto: UpdateShowtimeDto) {
  //   const [result] = await db
  //     .update(Showtime)
  //     .set({ ...updateShowtimeDto, updated_at: sql`NOW()` })
  //     .where(eq(Showtime.id, id))
  //     .returning({ showtime_id: Showtime.id })
  //   return { ...result, message: 'Update Showtime succesfully' }
  // }
  // async remove(id: string) {
  //   await db
  //     .update(Showtime)
  //     .set({ deleted_at: sql`NOW()` })
  //     .where(eq(Showtime.id, id))
  //   return { message: 'Delete succesfully' }
  // }
}
