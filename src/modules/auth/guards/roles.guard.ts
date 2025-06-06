import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { ROLES } from '~/decorators/role.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly refector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles: string[] = this.refector.getAllAndOverride(ROLES, [context.getHandler(), context.getClass()])
    const request = context.switchToHttp().getRequest()
    if (!roles.includes(request.user.role as unknown as string)) {
      throw new ForbiddenException('You do not have permission to access this resource')
    }
    return true
  }
}
