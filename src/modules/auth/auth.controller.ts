import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateAuthDto } from './dto/create-auth.dto'
import { UpdateAuthDto } from './dto/update-auth.dto'
import { LocalAuthGuard } from '~/modules/auth/guards/local-auth.guard'
import { Public } from '~/decorators/auth.decorator'
import { JwtAccessTokenGuard } from '~/modules/auth/guards/jwt-access-token.guard'
import { JwtRefreshTokenGuard } from '~/modules/auth/guards/jwt-refresh-token.guard'
import { Roles } from '~/decorators/role.decorator'
import { Role } from '~/common/types'
import { RolesGuard } from '~/modules/auth/guards/roles.guard'
import { MailService } from '~/modules/mail/mail.service'
import { UserService } from '~/modules/user/user.service'
import { ResetPasswordDto } from '~/modules/user/dto/reset-pass-word.dto'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailService: MailService,
    private userService: UserService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user)
  }

  @UseGuards(JwtRefreshTokenGuard)
  @Post('refresh')
  async refreshAccessToken(@Request() req) {
    const access_token = this.authService.generateAccessToken({
      user_id: req.user.id,
      email: req.user.email
    })
    return {
      user_id: req.user.id,
      access_token
    }
  }

  @Public()
  @Post('sign-up')
  create(@Body() body: CreateAuthDto) {
    return this.authService.signUp(body)
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAccessTokenGuard)
  @Get()
  findAll() {
    return this.authService.findAll()
  }

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    const { user, token, message } = await this.authService.forgotPassword(email)
    await this.mailService.sendEMail(user, token)
    return { message }
  }

  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    const { payload, hashedPassWord } = await this.authService.verifyTokenAndHashNewPassWord(dto)
    await this.userService.updatePassword(payload.user_id, hashedPassWord)
    return { message: 'Mật khẩu đã được cập nhật thành công' }
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
