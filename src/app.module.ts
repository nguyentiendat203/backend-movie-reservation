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
import { ConfigModule } from '@nestjs/config'
import { MailModule } from '~/modules/mail/mail.module'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'movie-reservation-system',
      autoLoadEntities: true,
      synchronize: true
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
