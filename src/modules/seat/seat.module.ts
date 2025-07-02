import { forwardRef, Module } from '@nestjs/common'
import { SeatService } from './seat.service'
import { SeatController } from './seat.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Seat } from '~/modules/seat/entities/seat.entity'
import { SeatRepository } from '~/modules/seat/repositories/seat.repository'
import { TemporaryLockModule } from '~/modules/temporary_lock/temporary_lock.module'
import { UserModule } from '~/modules/user/user.module'
import { ShowtimeModule } from '~/modules/showtime/showtime.module'
import { Showtime } from '~/modules/showtime/entities/showtime.entity'
import { User } from '~/modules/user/entities/user.entity'
import { TemporaryLock } from '~/modules/temporary_lock/entities/temporary_lock.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Seat]), forwardRef(() => ShowtimeModule), UserModule, TemporaryLockModule],
  controllers: [SeatController],
  providers: [
    SeatService,
    {
      provide: 'SeatRepositoryInterface',
      useClass: SeatRepository
    }
  ],
  exports: [SeatService, 'SeatRepositoryInterface']
})
export class SeatModule {}
