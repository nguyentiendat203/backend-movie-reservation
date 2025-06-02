import { Module } from '@nestjs/common';
import { ReservationSeatService } from './reservation_seat.service';
import { ReservationSeatController } from './reservation_seat.controller';

@Module({
  controllers: [ReservationSeatController],
  providers: [ReservationSeatService],
})
export class ReservationSeatModule {}
