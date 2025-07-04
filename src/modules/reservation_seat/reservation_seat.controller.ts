import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { ReservationSeatService } from './reservation_seat.service'
import { CreateReservationSeatDto } from './dto/create-reservation_seat.dto'
import { UpdateReservationSeatDto } from './dto/update-reservation_seat.dto'

@Controller('reservation-seat')
export class ReservationSeatController {
  constructor(private readonly reservationSeatService: ReservationSeatService) {}
}
