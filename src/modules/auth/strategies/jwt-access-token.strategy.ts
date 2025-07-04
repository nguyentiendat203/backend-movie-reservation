import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { IJwtPayload } from '~/common/types'
import { IUserRepository } from '~/modules/user/interfaces/user.repository.interface'

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('IUserRepository')
    private readonly usersRepository: IUserRepository,
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
    if (!payload || !payload.email) {
      throw new BadRequestException('Invalid token payload')
    }
    return await this.usersRepository.findOneByCondition({ where: { email: payload.email } })
  }
}
