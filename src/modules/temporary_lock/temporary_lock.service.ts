import { Inject, Injectable } from '@nestjs/common'
import { BaseService } from '~/shared/base/base.service'
import { TemporaryLock } from '~/modules/temporary_lock/entities/temporary_lock.entity'
import { ITempoLockService } from '~/modules/temporary_lock/interfaces/temporary_lock.service.interface'
import { ITempoLockRepository } from '~/modules/temporary_lock/interfaces/temporary_lock.repository.interface'

@Injectable()
export class TemporaryLockService extends BaseService<TemporaryLock> implements ITempoLockService {
  constructor(
    @Inject('TemporaryLockRepositoryInterface')
    private readonly tempoLockRepo: ITempoLockRepository
  ) {
    super(tempoLockRepo)
  }
}
