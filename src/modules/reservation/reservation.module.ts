import { Module } from '@nestjs/common'
import { ReservationService } from './reservation.service'
import { ReservationController } from './reservation.controller'
import { SeatModule } from '~/modules/seat/seat.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Reservation } from '~/modules/reservation/entities/reservation.entity'
import { ReservationRepository } from '~/modules/reservation/repositories/reservation.repository'
import { ReservationSeatModule } from '~/modules/reservation_seat/reservation_seat.module'

@Module({
  imports: [TypeOrmModule.forFeature([Reservation]), SeatModule, ReservationSeatModule],
  controllers: [ReservationController],
  providers: [
    ReservationService,
    {
      provide: 'IReservationRepository',
      useClass: ReservationRepository
    }
  ]
})
export class ReservationModule {}
