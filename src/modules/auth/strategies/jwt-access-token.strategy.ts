import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { IJwtPayload } from '~/common/types'
import { UserService } from '~/modules/user/user.service'

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(Strategy) {
  constructor(
    // private readonly userService: UserService,
    private readonly configService: ConfigService
  ) {
    const secretKey = configService.get<string>('ACCESS_TOKEN_SECRET')
    if (!secretKey) {
      throw new BadRequestException()
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secretKey
    })
  }

  async validate(payload: IJwtPayload) {
    // if (!payload || !payload.email) {
    //   throw new BadRequestException('Invalid token payload')
    // }
    // return await this.userService.findOne(payload.email)
  }
}
