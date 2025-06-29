import { Module } from '@nestjs/common'
import { MovieService } from './movie.service'
import { MovieController } from './movie.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Movie } from '~/modules/movie/entities/movie.entity'
import { MovieRepository } from '~/modules/movie/repositories/seat.repository'

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  controllers: [MovieController],
  providers: [
    MovieService,
    {
      provide: 'MovieRepositoryInterface',
      useClass: MovieRepository
    }
  ],
  exports: ['MovieRepositoryInterface']
})
export class MovieModule {}
