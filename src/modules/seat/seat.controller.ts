import { Controller, Get, Body, Patch, Param, Delete, UseGuards, ParseUUIDPipe, Query, DefaultValuePipe, ParseIntPipe, Req, Put, Request } from '@nestjs/common'
import { SeatService } from './seat.service'
import { UpdateSeatDto } from './dto/update-seat.dto'
import { JwtAccessTokenGuard } from '~/modules/auth/guards/jwt-access-token.guard'
import { RolesGuard } from '~/modules/auth/guards/roles.guard'
import { ConditionFilters, Role } from '~/common/types'
import { Roles } from '~/decorators/role.decorator'
import { LockSeatDto } from '~/modules/seat/dto/lock-seat.dto'

@UseGuards(JwtAccessTokenGuard)
@Controller('seat')
export class SeatController {
  constructor(private readonly seatService: SeatService) {}

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
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

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateSeatDto: UpdateSeatDto) {
    return this.seatService.update(id, updateSeatDto)
  }

  @Put('lock-seats')
  lockSeats(@Request() req, @Body() body: LockSeatDto) {
    return this.seatService.lockSeats(req.user.id, body)
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.seatService.softRemove(id)
  }
}
