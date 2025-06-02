import { Injectable } from '@nestjs/common';
import { CreateReservationSeatDto } from './dto/create-reservation_seat.dto';
import { UpdateReservationSeatDto } from './dto/update-reservation_seat.dto';

@Injectable()
export class ReservationSeatService {
  create(createReservationSeatDto: CreateReservationSeatDto) {
    return 'This action adds a new reservationSeat';
  }

  findAll() {
    return `This action returns all reservationSeat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reservationSeat`;
  }

  update(id: number, updateReservationSeatDto: UpdateReservationSeatDto) {
    return `This action updates a #${id} reservationSeat`;
  }

  remove(id: number) {
    return `This action removes a #${id} reservationSeat`;
  }
}
