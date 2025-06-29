import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Movie } from '~/modules/movie/entities/movie.entity'
import { IMovieRepository } from '~/modules/movie/interfaces/showtime.repository.interface'
import { BaseRepository } from '~/shared/base/base.repository'

@Injectable()
export class MovieRepository extends BaseRepository<Movie> implements IMovieRepository {
  constructor(
    @InjectRepository(Movie)
    private readonly seatRepo: Repository<Movie>
  ) {
    super(seatRepo)
  }
}
