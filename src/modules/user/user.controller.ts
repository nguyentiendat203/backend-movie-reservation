import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common'
import { UserService } from './user.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { CreateAuthDto } from '~/modules/auth/dto/create-auth.dto'
import { JwtAccessTokenGuard } from '~/modules/auth/guards/jwt-access-token.guard'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAccessTokenGuard)
  @Get('reservations')
  findShowtimesOfUser(@Request() req) {
    return this.userService.findShowtimesOfUser(req.user)
  }

  @Post()
  create(@Body() body: CreateAuthDto) {
    return this.userService.create(body)
  }

  @Get()
  findAll() {
    return this.userService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id)
  }
}
