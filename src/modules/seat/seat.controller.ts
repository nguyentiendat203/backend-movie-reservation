import { Controller, Get, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common'
import { SeatService } from './seat.service'
import { UpdateSeatDto } from './dto/update-seat.dto'
import { CreateReservationDto } from '~/modules/reservation/dto/create-reservation.dto'
import { JwtAccessTokenGuard } from '~/modules/auth/guards/jwt-access-token.guard'
import { RolesGuard } from '~/modules/auth/guards/roles.guard'
import { Role } from '~/common/types'
import { Roles } from '~/decorators/role.decorator'

@UseGuards(JwtAccessTokenGuard)
@Controller('seat')
export class SeatController {
  constructor(private readonly seatService: SeatService) {}

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Get()
  findAll() {
    return this.seatService.findAll()
  }

  @Patch('lock-seats')
  lockSeat(@Request() req, @Body() body: CreateReservationDto) {
    return this.seatService.lockSeats(req.user.id, body)
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSeatDto: UpdateSeatDto) {
    return this.seatService.update(id, updateSeatDto)
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seatService.remove(id)
  }
}
