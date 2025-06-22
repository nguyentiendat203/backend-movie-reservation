import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ParseUUIDPipe, Inject, Put, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateAuthDto } from '~/modules/auth/dto/create-auth.dto'
import { JwtAccessTokenGuard } from '~/modules/auth/guards/jwt-access-token.guard'
import { RolesGuard } from '~/modules/auth/guards/roles.guard'
import { Roles } from '~/decorators/role.decorator'
import { Role } from '~/common/types'
import { UpdateAuthDto } from '~/modules/auth/dto/update-auth.dto'
import { User } from '~/modules/user/entities/user.entity'
import { CreateUserDto } from '~/modules/user/dto/create-user.dto'
import { UpdateUserDto } from '~/modules/user/dto/update-user.dto'
import { DeepPartial } from 'typeorm'

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
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll()
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User | null> {
    return this.userService.findOneById(id)
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<User> {
    return this.userService.create(dto as DeepPartial<User>)
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto): Promise<User> {
    return this.userService.update(id, dto)
  }

  @Delete(':id')
  async softRemove(@Param('id') id: string): Promise<void> {
    return this.userService.softRemove(id)
  }
}
