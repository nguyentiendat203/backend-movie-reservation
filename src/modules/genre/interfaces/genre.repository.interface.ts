import { Genre } from '~/modules/genre/entities/genre.entity'
import { IBaseRepository } from '~/shared/base/base.repository.interface'

export interface IGenreRepository extends IBaseRepository<Genre> {}
