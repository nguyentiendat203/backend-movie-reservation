import { Movie } from '~/modules/movie/entities/movie.entity'
import { IBaseRepository } from '~/shared/base/base.repository.interface'

export interface IMovieRepository extends IBaseRepository<Movie> {}
