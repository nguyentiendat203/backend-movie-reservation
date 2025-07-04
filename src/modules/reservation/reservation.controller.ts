import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ParseUUIDPipe } from '@nestjs/common'
import { ReservationService } from './reservation.service'
import { JwtAccessTokenGuard } from '~/modules/auth/guards/jwt-access-token.guard'
import { CreateReservationDto } from '~/modules/reservation/dto/create-reservation.dto'
import { RolesGuard } from '~/modules/auth/guards/roles.guard'
import { Roles } from '~/decorators/role.decorator'
import { Role } from '~/common/types'

@UseGuards(JwtAccessTokenGuard)
@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  reserShowtime(@Request() req, @Body() body: CreateReservationDto) {
    return this.reservationService.reserShowtime(req.user, body)
  }

  @Get('mine')
  findMyReservation(@Request() req) {
    return this.reservationService.findMyReservation(req.user.id)
  }

  @Patch(':reser_id/cancel')
  cancelShowtimeResered(@Param('reser_id', ParseUUIDPipe) reser_id: string) {
    return this.reservationService.cancelShowtimeResered(reser_id)
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Get()
  findAll() {
    return this.reservationService.findAll()
  }
}
