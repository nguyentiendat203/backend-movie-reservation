import { Module } from '@nestjs/common'
import { ReservationSeatService } from './reservation_seat.service'
import { ReservationSeatController } from './reservation_seat.controller'
import { ReservationSeat } from '~/modules/reservation_seat/entities/reservation_seat.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ReservationSeatRepository } from '~/modules/reservation_seat/repositories/reservation_seat.repository'

@Module({
  imports: [TypeOrmModule.forFeature([ReservationSeat])],
  controllers: [ReservationSeatController],
  providers: [
    ReservationSeatService,
    {
      provide: 'IReserSeatRepository',
      useClass: ReservationSeatRepository
    }
  ],
  exports: ['IReserSeatRepository']
})
export class ReservationSeatModule {}
