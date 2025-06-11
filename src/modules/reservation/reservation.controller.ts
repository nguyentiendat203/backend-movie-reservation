import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common'
import { ReservationService } from './reservation.service'
import { UpdateReservationDto } from './dto/update-reservation.dto'
import { JwtAccessTokenGuard } from '~/modules/auth/guards/jwt-access-token.guard'
import { CreateReservationDto } from '~/modules/reservation/dto/create-reservation.dto'
import { IReservation } from '~/modules/reservation/interfaces/reservation.interface'

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @UseGuards(JwtAccessTokenGuard)
  @Post()
  reserShowtime(@Request() req, @Body() body: IReservation) {
    return this.reservationService.reserShowtime(req.user, body)
  }

  @Get(':showtime_id')
  create(@Param('showtime_id') showtime_id: string) {
    return this.reservationService.create(showtime_id)
  }

  @Patch('cancel/:reser_id')
  cancelShowtimeResered(@Param('reser_id') reser_id: string) {
    return this.reservationService.cancelShowtimeResered(reser_id)
  }

  @Get()
  findAll() {
    return this.reservationService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto) {
    return this.reservationService.update(+id, updateReservationDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationService.remove(+id)
  }
}
