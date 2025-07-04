import { Reservation } from '~/modules/reservation/entities/reservation.entity'
import { IBaseService } from '~/shared/base/base.service.interface'

export interface IReservationService extends IBaseService<Reservation> {}
