import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from '~/modules/user/user.module'
import { MovieModule } from '~/modules/movie/movie.module'
import { GenreModule } from '~/modules/genre/genre.module'
import { ReservationModule } from '~/modules/reservation/reservation.module'
import { ReservationSeatModule } from '~/modules/reservation_seat/reservation_seat.module'
import { SeatModule } from '~/modules/seat/seat.module'
import { ShowtimeModule } from '~/modules/showtime/showtime.module'
import { TemporaryLockModule } from '~/modules/temporary_lock/temporary_lock.module'
import { AuthModule } from '~/modules/auth/auth.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MailModule } from '~/modules/mail/mail.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true
      })
    }),
    AuthModule,
    UserModule,
    MovieModule,
    GenreModule,
    ReservationModule,
    ReservationSeatModule,
    SeatModule,
    ShowtimeModule,
    TemporaryLockModule,
    MailModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
