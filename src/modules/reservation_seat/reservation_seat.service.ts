import { Inject, Injectable } from '@nestjs/common'
import { BaseService } from '~/shared/base/base.service'
import { ReservationSeat } from '~/modules/reservation_seat/entities/reservation_seat.entity'
import { IReserSeatService } from '~/modules/reservation_seat/interfaces/reservation_seat.service.interface'
import { IReserSeatRepository } from '~/modules/reservation_seat/interfaces/reservation_seat.repository.interface'

@Injectable()
export class ReservationSeatService extends BaseService<ReservationSeat> implements IReserSeatService {
  constructor(
    @Inject('IReserSeatRepository')
    private readonly reserSeatRepo: IReserSeatRepository
  ) {
    super(reserSeatRepo)
  }
}
