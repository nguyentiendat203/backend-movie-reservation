import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ParseUUIDPipe } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateAuthDto } from '~/modules/auth/dto/create-auth.dto'
import { JwtAccessTokenGuard } from '~/modules/auth/guards/jwt-access-token.guard'
import { RolesGuard } from '~/modules/auth/guards/roles.guard'
import { Roles } from '~/decorators/role.decorator'
import { Role } from '~/common/types'
import { UpdateAuthDto } from '~/modules/auth/dto/update-auth.dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // create(@Body() body: CreateAuthDto) {
  //   return this.userService.create(body)
  // }

  // @Roles(Role.ADMIN)
  // @UseGuards(RolesGuard)
  // @UseGuards(JwtAccessTokenGuard)
  // @Get()
  // findAll() {
  //   return this.userService.findAll()
  // }

  // @UseGuards(JwtAccessTokenGuard)
  // @Patch(':id')
  // update(@Param('id', ParseUUIDPipe) id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.userService.update(id, updateAuthDto)
  // }

  // @Roles(Role.ADMIN)
  // @UseGuards(RolesGuard)
  // @UseGuards(JwtAccessTokenGuard)
  // @Delete(':id')
  // remove(@Param('id', ParseUUIDPipe) id: string) {
  //   return this.userService.remove(id)
  // }
}
