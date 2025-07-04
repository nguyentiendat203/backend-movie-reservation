import { ReservationSeat } from '~/modules/reservation_seat/entities/reservation_seat.entity'
import { IBaseRepository } from '~/shared/base/base.repository.interface'

export interface IReserSeatRepository extends IBaseRepository<ReservationSeat> {}
