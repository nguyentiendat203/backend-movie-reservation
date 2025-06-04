import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Request, HttpStatus, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateAuthDto } from './dto/create-auth.dto'
import { UpdateAuthDto } from './dto/update-auth.dto'
import { AuthGuard } from '@nestjs/passport'
import { LocalAuthGuard } from '~/modules/auth/passport/local-auth.guard'
import { JwtAuthGuard } from '~/modules/auth/passport/jwt-auth.guard'
import { Public } from '~/decorators/decorators'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user)
  }

  @Public()
  @Post('sign-up')
  create(@Body() body: CreateAuthDto) {
    return this.authService.signUp(body)
  }

  @Get()
  findAll() {
    return this.authService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id)
  }
}
