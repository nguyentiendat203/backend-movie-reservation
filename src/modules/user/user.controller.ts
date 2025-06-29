import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put, UseInterceptors, ClassSerializerInterceptor, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common'
import { UserService } from './user.service'
import { JwtAccessTokenGuard } from '~/modules/auth/guards/jwt-access-token.guard'
import { RolesGuard } from '~/modules/auth/guards/roles.guard'
import { Roles } from '~/decorators/role.decorator'
import { Role } from '~/common/types'
import { User } from '~/modules/user/entities/user.entity'
import { CreateUserDto } from '~/modules/user/dto/create-user.dto'
import { UpdateUserDto } from '~/modules/user/dto/update-user.dto'
import { DeepPartial } from 'typeorm'
import { FindAllResponse } from '~/shared/base/base.repository.interface'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @UseInterceptors(ClassSerializerInterceptor)
  // @Roles(Role.ADMIN)
  // @UseGuards(RolesGuard)
  // @UseGuards(JwtAccessTokenGuard)
  // @Get()
  // async getAllUsers(
  //   @Query('page', new DefaultValuePipe(1), ParseIntPipe)
  //   page: number,
  //   @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number
  // ): Promise<FindAllResponse<User>> {
  //   return this.userService.findAll(page, limit)
  // }

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
  async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto): Promise<boolean> {
    return this.userService.update(id, dto)
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAccessTokenGuard)
  @Delete(':id')
  async softRemove(@Param('id') id: string): Promise<boolean> {
    return this.userService.softRemove(id)
  }
}
