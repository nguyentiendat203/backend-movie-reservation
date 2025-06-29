import { Controller, Get, Body, Patch, Param, Delete, UseGuards, Request, ParseUUIDPipe, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common'
import { SeatService } from './seat.service'
import { UpdateSeatDto } from './dto/update-seat.dto'
import { CreateReservationDto } from '~/modules/reservation/dto/create-reservation.dto'
import { JwtAccessTokenGuard } from '~/modules/auth/guards/jwt-access-token.guard'
import { RolesGuard } from '~/modules/auth/guards/roles.guard'
import { ConditionFilters, Role } from '~/common/types'
import { Roles } from '~/decorators/role.decorator'

// @UseGuards(JwtAccessTokenGuard)
@Controller('seat')
export class SeatController {
  constructor(private readonly seatService: SeatService) {}

  // @Roles(Role.ADMIN)
  // @UseGuards(RolesGuard)
  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit: number
  ) {
    const filter: ConditionFilters = {
      page: page,
      limit: limit,
      relations: {
        showtime: true
      },
      select: {
        showtime: {
          id: true
        }
      }
    }
    return this.seatService.findAll(filter)
  }

  // create(): {}

  // @Patch('lock-seats')
  // lockSeat(@Request() req, @Body() body: CreateReservationDto) {
  //   return this.seatService.lockSeats(req.user.id, body)
  // }

  // @Roles(Role.ADMIN)
  // @UseGuards(RolesGuard)
  // @Patch(':id')
  // update(@Param('id', ParseUUIDPipe) id: string, @Body() updateSeatDto: UpdateSeatDto) {
  //   return this.seatService.update(id, updateSeatDto)
  // }

  // @Roles(Role.ADMIN)
  // @UseGuards(RolesGuard)
  // @Delete(':id')
  // remove(@Param('id', ParseUUIDPipe) id: string) {
  //   return this.seatService.remove(id)
  // }
}
