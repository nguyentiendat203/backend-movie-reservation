import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { ShowtimeService } from './showtime.service'
import { CreateShowtimeDto } from './dto/create-showtime.dto'
import { UpdateShowtimeDto } from './dto/update-showtime.dto'
import { Roles } from '~/decorators/role.decorator'
import { RolesGuard } from '~/modules/auth/guards/roles.guard'
import { JwtAccessTokenGuard } from '~/modules/auth/guards/jwt-access-token.guard'
import { UserRole } from '~/modules/auth/dto/create-auth.dto'

@Controller('showtime')
export class ShowtimeController {
  constructor(private readonly showtimeService: ShowtimeService) {}

  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAccessTokenGuard)
  @Post()
  create(@Body() createShowtimeDto: CreateShowtimeDto) {
    return this.showtimeService.create(createShowtimeDto)
  }

  @Get()
  findAll() {
    return this.showtimeService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.showtimeService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShowtimeDto: UpdateShowtimeDto) {
    return this.showtimeService.update(+id, updateShowtimeDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.showtimeService.remove(+id)
  }
}
