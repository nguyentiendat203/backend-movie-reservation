import { CreateSeatDto } from './dto/create-seat.dto'
import { UpdateSeatDto } from './dto/update-seat.dto'
import { CreateReservationDto } from '~/modules/reservation/dto/create-reservation.dto'
import { BadRequestException, ConflictException, Inject, Injectable } from '@nestjs/common'
import { BaseService } from '~/shared/base/base.service'
import { Seat } from '~/modules/seat/entities/seat.entity'
import { ISeatService } from '~/modules/seat/interfaces/seat.service.interface'
import { ISeatRepository } from '~/modules/seat/interfaces/seat.repository.interface'
import { InjectRepository } from '@nestjs/typeorm'
import { And, DeepPartial, Equal, In, LessThan, Like, MoreThan, Repository } from 'typeorm'
import { ConditionFilters } from '~/common/types'
import { TemporaryLockRepository } from '~/modules/temporary_lock/repositories/temporary_lock.repository'
import { LockSeatDto } from '~/modules/seat/dto/lock-seat.dto'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { TemporaryLock } from '~/modules/temporary_lock/entities/temporary_lock.entity'
import { ShowtimeRepository } from '~/modules/showtime/repositories/showtime.repository'
import { UserRepository } from '~/modules/user/repository/user.repository'

const LOCK_DURATION_MINUTES = 5

@Injectable()
export class SeatService extends BaseService<Seat> implements ISeatService {
  constructor(
    @Inject('SeatRepositoryInterface')
    private readonly seatRepo: ISeatRepository
  ) {
    super(seatRepo)
  }

  @Inject('IUserRepository')
  private readonly userRepo: UserRepository
  @Inject('ShowtimeRepositoryInterface')
  private readonly showtimeRepo: ShowtimeRepository
  @Inject('TemporaryLockRepositoryInterface')
  private readonly tempoLockRepo: TemporaryLockRepository

  async findSeatsBelongShowtime(showtime_id: string) {
    // return await this.seatRepo.findAll({ showtime_id } as Record<string, number>)
  }

  async checkSeatsBelongShowtime(showtime_id: string, seatIds: string[]): Promise<boolean> {
    const showtimeResult = await this.showtimeRepo.findAll({
      where: {
        id: Equal(showtime_id)
      },
      select: {
        id: true,
        seats: {
          id: true,
          seat_name: true
        }
      },
      relations: {
        seats: true
      }
    })
    const seatsOfShowtimeIds = showtimeResult.items[0].seats.map((item) => item.id)
    return seatIds.every((seat) => seatsOfShowtimeIds.includes(seat))
  }

  async lockSeats(userId: string, body: LockSeatDto) {
    const { showtimeId, seatIds } = body
    const now = new Date()
    const expiresAt = new Date(Date.now() + LOCK_DURATION_MINUTES * 60 * 1000)

    // 1. Check if there are any Temporary_Lock rocords with expires_at less than now and delete
    const tempoLock = await this.tempoLockRepo.findOneByCondition({ where: { expires_at: LessThan(now) } })
    if (tempoLock) {
      await this.tempoLockRepo.softRemove(tempoLock.id)
    }

    // 2. Check if Seats belongs to  showtime
    if (!this.checkSeatsBelongShowtime(showtimeId, seatIds)) {
      throw new BadRequestException('Seats are not belong to showtime')
    }

    // 3. Check if the seat is blocked by other users
    const results = await this.tempoLockRepo.findAll({
      where: {
        showtime: { id: showtimeId },
        seat: {
          id: In(seatIds)
        },
        expires_at: MoreThan(now)
      },
      relations: ['seat', 'showtime']
    })
    if (results.count > 0) {
      throw new ConflictException('Seats already locked by other users')
    }

    // 4. Insert to table TemporaryLock
    seatIds.map((seatId) =>
      this.tempoLockRepo.create({
        seat: { id: seatId },
        showtime: { id: showtimeId },
        user: { id: userId },
        locked_at: now,
        expires_at: expiresAt
      } as DeepPartial<TemporaryLock>)
    )

    return { message: 'Seats locked successfully' }
  }
}
