import { Genre } from '~/modules/genre/entities/genre.entity'
import { IBaseService } from '~/shared/base/base.service.interface'

export interface IGenreService extends IBaseService<Genre> {}
