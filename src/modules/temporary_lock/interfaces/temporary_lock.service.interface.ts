import { TemporaryLock } from '~/modules/temporary_lock/entities/temporary_lock.entity'
import { IBaseService } from '~/shared/base/base.service.interface'

export interface ITempoLockService extends IBaseService<TemporaryLock> {}
