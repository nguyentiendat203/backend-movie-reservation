import { Module } from '@nestjs/common'
import { SeatService } from './seat.service'
import { SeatController } from './seat.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Seat } from '~/modules/seat/entities/seat.entity'
import { SeatRepository } from '~/modules/seat/repositories/seat.repository'

@Module({
  imports: [TypeOrmModule.forFeature([Seat])],
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
