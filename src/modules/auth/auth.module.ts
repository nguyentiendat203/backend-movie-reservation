import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UserModule } from '~/modules/user/user.module'
import { JwtModule } from '@nestjs/jwt'
import { LocalStrategy } from '~/modules/auth/strategies/local.strategy'
import { PassportModule } from '@nestjs/passport'
import { ConfigModule } from '@nestjs/config'
import { JwtAccessTokenStrategy } from '~/modules/auth/strategies/jwt-access-token.strategy'
import { JwtRefreshTokenStrategy } from '~/modules/auth/strategies/jwt-refresh-token.strategy'

@Module({
  imports: [UserModule, PassportModule, JwtModule.register({}), ConfigModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtAccessTokenStrategy, JwtRefreshTokenStrategy],
  exports: [AuthService]
})
export class AuthModule {}
