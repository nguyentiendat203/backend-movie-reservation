import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserRepository } from '~/modules/user/repository/user.repository'
import { User } from '~/modules/user/entities/user.entity'
import { TemporaryLock } from '~/modules/temporary_lock/entities/temporary_lock.entity'
import { Showtime } from '~/modules/showtime/entities/showtime.entity'
import { Seat } from '~/modules/seat/entities/seat.entity'
import { Reservation } from '~/modules/reservation/entities/reservation.entity'
import { ReservationSeat } from '~/modules/reservation_seat/entities/reservation_seat.entity'
import { Movie } from '~/modules/movie/entities/movie.entity'
import { Genre } from '~/modules/genre/entities/genre.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User, TemporaryLock, Showtime, Seat, Reservation, ReservationSeat, Showtime, Movie, Genre])],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'UserRepositoryInterface',
      useClass: UserRepository
    },
    {
      provide: 'UserServiceInterface',
      useClass: UserService
    }
  ],
  exports: ['UserServiceInterface', 'UserRepositoryInterface']
})
export class UserModule {}
