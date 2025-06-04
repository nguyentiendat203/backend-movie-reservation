import { Request } from 'express'
import { BadRequestException, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { IJwtPayload } from '~/common/types'
import { ConfigService } from '@nestjs/config'
import { AuthService } from '~/modules/auth/auth.service'

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'refresh-token') {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {
    const secretKey = configService.get<string>('REFRESH_TOKEN_SECRET')
    if (!secretKey) {
      throw new BadRequestException()
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secretKey,
      passReqToCallback: true
    })
  }

  async validate(request: Request, payload: IJwtPayload) {
    const refreshToken = request.headers.authorization?.split(' ')[1]
    if (!refreshToken) {
      throw new BadRequestException('Refresh token is missing')
    }
    return await this.authService.getUserIfRefreshTokenMatched(payload.user_id, refreshToken)
  }
}
