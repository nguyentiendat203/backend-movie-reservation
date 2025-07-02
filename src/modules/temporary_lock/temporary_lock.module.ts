import { Module } from '@nestjs/common'
import { TemporaryLockService } from './temporary_lock.service'
import { TemporaryLockController } from './temporary_lock.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TemporaryLock } from '~/modules/temporary_lock/entities/temporary_lock.entity'
import { TemporaryLockRepository } from '~/modules/temporary_lock/repositories/temporary_lock.repository'

@Module({
  imports: [TypeOrmModule.forFeature([TemporaryLock])],
  controllers: [TemporaryLockController],
  providers: [
    TemporaryLockService,
    {
      provide: 'TemporaryLockRepositoryInterface',
      useClass: TemporaryLockRepository
    }
  ],
  exports: [TemporaryLockService, 'TemporaryLockRepositoryInterface']
})
export class TemporaryLockModule {}
