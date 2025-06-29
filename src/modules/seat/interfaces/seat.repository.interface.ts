import { Seat } from '~/modules/seat/entities/seat.entity'
import { IBaseRepository } from '~/shared/base/base.repository.interface'

export interface ISeatRepository extends IBaseRepository<Seat> {}
