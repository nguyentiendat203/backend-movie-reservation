import { Module } from '@nestjs/common'
import { ReservationService } from './reservation.service'
import { ReservationController } from './reservation.controller'
import { SeatModule } from '~/modules/seat/seat.module'

@Module({
  imports: [SeatModule],
  controllers: [ReservationController],
  providers: [ReservationService]
})
export class ReservationModule {}
