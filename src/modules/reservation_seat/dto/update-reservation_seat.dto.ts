import { PartialType } from '@nestjs/mapped-types';
import { CreateReservationSeatDto } from './create-reservation_seat.dto';

export class UpdateReservationSeatDto extends PartialType(CreateReservationSeatDto) {}
