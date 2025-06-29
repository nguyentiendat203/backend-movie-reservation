import { Movie } from '~/modules/movie/entities/movie.entity'
import { IBaseService } from '~/shared/base/base.service.interface'

export interface IMovieService extends IBaseService<Movie> {}
