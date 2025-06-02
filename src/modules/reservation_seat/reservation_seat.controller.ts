import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReservationSeatService } from './reservation_seat.service';
import { CreateReservationSeatDto } from './dto/create-reservation_seat.dto';
import { UpdateReservationSeatDto } from './dto/update-reservation_seat.dto';

@Controller('reservation-seat')
export class ReservationSeatController {
  constructor(private readonly reservationSeatService: ReservationSeatService) {}

  @Post()
  create(@Body() createReservationSeatDto: CreateReservationSeatDto) {
    return this.reservationSeatService.create(createReservationSeatDto);
  }

  @Get()
  findAll() {
    return this.reservationSeatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationSeatService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReservationSeatDto: UpdateReservationSeatDto) {
    return this.reservationSeatService.update(+id, updateReservationSeatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationSeatService.remove(+id);
  }
}
