import { ExecutionContext, GoneException, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { Observable } from 'rxjs'
import { IS_PUBLIC_KEY } from '~/decorators/auth.decorator'

@Injectable()
export class JwtAccessTokenGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }

  handleRequest(err, user, info, context) {
    if (err || !user) {
      if (info?.name === 'TokenExpiredError') {
        throw new GoneException('Access token expired')
      } else if (info?.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Invalid access token')
      }
      throw new UnauthorizedException('Unauthorized')
    }
    return user
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()])
    if (isPublic) {
      return true
    }
    return super.canActivate(context)
  }
}
