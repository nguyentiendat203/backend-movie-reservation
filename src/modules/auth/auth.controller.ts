import { Controller, Get, Post, Body, Patch, Request, UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateAuthDto } from './dto/create-auth.dto'
import { LocalAuthGuard } from '~/modules/auth/guards/local-auth.guard'
import { Public } from '~/decorators/auth.decorator'
import { JwtAccessTokenGuard } from '~/modules/auth/guards/jwt-access-token.guard'
import { JwtRefreshTokenGuard } from '~/modules/auth/guards/jwt-refresh-token.guard'
import { MailService } from '~/modules/mail/mail.service'
import { ResetPasswordDto } from '~/modules/user/dto/reset-pass-word.dto'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailService: MailService
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user)
  }

  @UseGuards(JwtAccessTokenGuard)
  @Patch('logout')
  async logout(@Request() req) {
    return await this.authService.logout(req.user)
  }

  @UseGuards(JwtRefreshTokenGuard)
  @Post('refresh')
  refreshAccessToken(@Request() req) {
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
  async create(@Body() body: CreateAuthDto) {
    return await this.authService.signUp(body)
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
    await this.authService.updatePassword(payload.user_id, hashedPassWord)
    return { message: 'Password has been updated successfully' }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAccessTokenGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return await this.authService.getProfile(req.user.id)
  }
}
