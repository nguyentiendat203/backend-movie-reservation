import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeepPartial, Repository } from 'typeorm'
import { TemporaryLock } from '~/modules/temporary_lock/entities/temporary_lock.entity'
import { ITempoLockRepository } from '~/modules/temporary_lock/interfaces/temporary_lock.repository.interface'
import { BaseRepository } from '~/shared/base/base.repository'

@Injectable()
export class TemporaryLockRepository extends BaseRepository<TemporaryLock> implements ITempoLockRepository {
  constructor(
    @InjectRepository(TemporaryLock)
    private readonly tempoLockRepo: Repository<TemporaryLock>
  ) {
    super(tempoLockRepo)
  }

  async insertMany(tempoLocks: DeepPartial<TemporaryLock>[]) {
    return await this.tempoLockRepo.insert(tempoLocks)
  }
}
