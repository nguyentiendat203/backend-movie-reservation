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
import { MailModule } from '~/modules/mail/mail.module'
import { UserRepository } from '~/modules/user/repository/user.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '~/modules/user/entities/user.entity'

@Module({
  imports: [UserModule, PassportModule, MailModule, JwtModule.register({}), ConfigModule, TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtAccessTokenStrategy,
    JwtRefreshTokenStrategy,
    {
      provide: 'UserRepositoryInterface',
      useClass: UserRepository
    }
  ],
  exports: [AuthService]
})
export class AuthModule {}
