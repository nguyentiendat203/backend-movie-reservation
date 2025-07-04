import { Reservation } from '~/modules/reservation/entities/reservation.entity'
import { IBaseRepository } from '~/shared/base/base.repository.interface'

export interface IReservationRepository extends IBaseRepository<Reservation> {}
