import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { IS_PUBLIC_KEY } from '~/decorators/auth.decorator'

@Injectable()
export class JwtRefreshTokenGuard extends AuthGuard('refresh-token') {
  constructor(private reflector: Reflector) {
    super()
  }

  handleRequest(err, user, info, context) {
    if (err || !user) {
      if (info?.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Refresh token expired')
      } else if (info?.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Invalid refresh token')
      }
      throw new UnauthorizedException('Unauthorized')
    }
    return user
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()])
    if (isPublic) {
      return true
    }
    return super.canActivate(context)
  }
}
