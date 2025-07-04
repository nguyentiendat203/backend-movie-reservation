import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseUUIDPipe } from '@nestjs/common'
import { ShowtimeService } from './showtime.service'
import { CreateShowtimeDto } from './dto/create-showtime.dto'
import { UpdateShowtimeDto } from './dto/update-showtime.dto'
import { Roles } from '~/decorators/role.decorator'
import { RolesGuard } from '~/modules/auth/guards/roles.guard'
import { JwtAccessTokenGuard } from '~/modules/auth/guards/jwt-access-token.guard'
import { Public } from '~/decorators/auth.decorator'
import { Role } from '~/common/types'

@UseGuards(JwtAccessTokenGuard)
@Controller('showtime')
export class ShowtimeController {
  constructor(private readonly showtimeService: ShowtimeService) {}

  @Public()
  @Get(':showtime_id/seats/available')
  findSeatsAvailableOfShowtime(@Param('showtime_id', ParseUUIDPipe) showtime_id: string) {
    return this.showtimeService.findSeatsAvailableOfShowtime(showtime_id)
  }

  @Public()
  @Get(':showtime_id/seats')
  findSeatsBelongShowtime(@Param('showtime_id', ParseUUIDPipe) showtime_id: string) {
    return this.showtimeService.findSeatsBelongShowtime(showtime_id)
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.showtimeService.findOneByCondition({
      where: { id }
    })
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateShowtimeDto: UpdateShowtimeDto) {
    return this.showtimeService.update(id, updateShowtimeDto)
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Delete(':id')
  softRemove(@Param('id', ParseUUIDPipe) id: string) {
    return this.showtimeService.softRemove(id)
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createShowtimeDto: CreateShowtimeDto) {
    return this.showtimeService.create(createShowtimeDto)
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Get()
  findAll() {
    return this.showtimeService.findAll()
  }
}
