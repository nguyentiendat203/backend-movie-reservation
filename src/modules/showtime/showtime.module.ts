import { forwardRef, Module } from '@nestjs/common'
import { ShowtimeService } from './showtime.service'
import { ShowtimeController } from './showtime.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Showtime } from '~/modules/showtime/entities/showtime.entity'
import { ShowtimeRepository } from '~/modules/showtime/repositories/showtime.repository'
import { SeatModule } from '~/modules/seat/seat.module'
import { MovieModule } from '~/modules/movie/movie.module'
import { ReservationSeatModule } from '~/modules/reservation_seat/reservation_seat.module'

@Module({
  imports: [TypeOrmModule.forFeature([Showtime]), forwardRef(() => SeatModule), MovieModule, ReservationSeatModule],
  controllers: [ShowtimeController],
  providers: [
    ShowtimeService,
    {
      provide: 'ShowtimeRepositoryInterface',
      useClass: ShowtimeRepository
    }
  ],
  exports: ['ShowtimeRepositoryInterface']
})
export class ShowtimeModule {}
