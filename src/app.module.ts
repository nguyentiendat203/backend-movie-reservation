import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from '~/modules/user/user.module'
import { MovieModule } from '~/modules/movie/movie.module'
import { GenreModule } from '~/modules/genre/genre.module'
import { ReservationModule } from '~/modules/reservation/reservation.module'
import { ReservationSeatModule } from '~/modules/reservation_seat/reservation_seat.module'
import { RoomModule } from '~/modules/room/room.module'
import { SeatModule } from '~/modules/seat/seat.module'
import { ShowtimeModule } from '~/modules/showtime/showtime.module'
import { TemporaryLockModule } from '~/modules/temporary_lock/temporary_lock.module'
import { TheaterModule } from '~/modules/theater/theater.module'
import { AuthModule } from '~/modules/auth/auth.module'

@Module({
  imports: [AuthModule, UserModule, MovieModule, GenreModule, ReservationModule, ReservationSeatModule, RoomModule, SeatModule, ShowtimeModule, TemporaryLockModule, TheaterModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
