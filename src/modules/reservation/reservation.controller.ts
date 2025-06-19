import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common'
import { ReservationService } from './reservation.service'
import { JwtAccessTokenGuard } from '~/modules/auth/guards/jwt-access-token.guard'
import { CreateReservationDto } from '~/modules/reservation/dto/create-reservation.dto'
import { RolesGuard } from '~/modules/auth/guards/roles.guard'
import { Roles } from '~/decorators/role.decorator'
import { Role } from '~/common/types'

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @UseGuards(JwtAccessTokenGuard)
  @Post()
  reserShowtime(@Request() req, @Body() body: CreateReservationDto) {
    return this.reservationService.reserShowtime(req.user, body)
  }

  @UseGuards(JwtAccessTokenGuard)
  @Get('my')
  findShowtimesOfUser(@Request() req) {
    return this.reservationService.findMyReservation(req.user)
  }

  @UseGuards(JwtAccessTokenGuard)
  @Patch('cancel/:reser_id')
  cancelShowtimeResered(@Param('reser_id') reser_id: string) {
    return this.reservationService.cancelShowtimeResered(reser_id)
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAccessTokenGuard)
  @Get()
  findAll() {
    return this.reservationService.findAll()
  }
}
