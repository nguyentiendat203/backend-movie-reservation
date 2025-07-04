import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ReservationSeat } from '~/modules/reservation_seat/entities/reservation_seat.entity'
import { IReserSeatRepository } from '~/modules/reservation_seat/interfaces/reservation_seat.repository.interface'
import { BaseRepository } from '~/shared/base/base.repository'

@Injectable()
export class ReservationSeatRepository extends BaseRepository<ReservationSeat> implements IReserSeatRepository {
  constructor(
    @InjectRepository(ReservationSeat)
    private readonly reserSeatRepo: Repository<ReservationSeat>
  ) {
    super(reserSeatRepo)
  }
}
