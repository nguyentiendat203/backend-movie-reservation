import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UserModule } from '~/modules/user/user.module'
import { JwtModule } from '@nestjs/jwt'
import { LocalStrategy } from '~/modules/auth/passport/local.strategy'
import { PassportModule } from '@nestjs/passport'
import 'dotenv/config'
import { JwtStrategy } from '~/modules/auth/passport/jwt.strategy'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from '~/modules/auth/passport/jwt-auth.guard'

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: '10s' }
    })
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    AuthService,
    LocalStrategy,
    JwtStrategy
  ],
  exports: [AuthService]
})
export class AuthModule {}
