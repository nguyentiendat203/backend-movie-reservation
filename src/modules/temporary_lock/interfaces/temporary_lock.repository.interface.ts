import { TemporaryLock } from '~/modules/temporary_lock/entities/temporary_lock.entity'
import { IBaseRepository } from '~/shared/base/base.repository.interface'

export interface ITempoLockRepository extends IBaseRepository<TemporaryLock> {}
