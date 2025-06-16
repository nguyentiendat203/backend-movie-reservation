import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common'
import { SeatService } from './seat.service'
import { CreateSeatDto } from './dto/create-seat.dto'
import { UpdateSeatDto } from './dto/update-seat.dto'
import { CreateReservationDto } from '~/modules/reservation/dto/create-reservation.dto'
import { JwtAccessTokenGuard } from '~/modules/auth/guards/jwt-access-token.guard'

@Controller('seat')
export class SeatController {
  constructor(private readonly seatService: SeatService) {}

  @Post()
  create(@Body() createSeatDto: CreateSeatDto) {
    return this.seatService.create(createSeatDto)
  }

  @Get()
  findAll() {
    return this.seatService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seatService.findOne(+id)
  }

  @UseGuards(JwtAccessTokenGuard)
  @Patch('lock-seats')
  lockSeat(@Request() req, @Body() body: CreateReservationDto) {
    return this.seatService.lockSeats(req.user.id, body)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSeatDto: UpdateSeatDto) {
    return this.seatService.update(+id, updateSeatDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seatService.remove(+id)
  }
}
