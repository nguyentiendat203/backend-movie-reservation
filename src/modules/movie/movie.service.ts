import { Inject, Injectable } from '@nestjs/common'
import { BaseService } from '~/shared/base/base.service'
import { Movie } from '~/modules/movie/entities/movie.entity'
import { IMovieService } from '~/modules/movie/interfaces/movie.service.interface'
import { IMovieRepository } from '~/modules/movie/interfaces/movie.repository.interface'

@Injectable()
export class MovieService extends BaseService<Movie> implements IMovieService {
  constructor(
    @Inject('IMovieRepository')
    private readonly movieRepo: IMovieRepository
  ) {
    super(movieRepo)
  }

  async findAllByGenre(genre_id: string) {
    return await this.movieRepo.findAll({
      relations: ['genre'],
      where: {
        genre: {
          id: genre_id
        }
      }
    })
  }
}
