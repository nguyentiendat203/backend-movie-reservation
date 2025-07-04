import { Inject, Injectable } from '@nestjs/common'
import { CreateGenreDto } from './dto/create-genre.dto'
import { UpdateGenreDto } from './dto/update-genre.dto'
import { BaseService } from '~/shared/base/base.service'
import { Genre } from '~/modules/genre/entities/genre.entity'
import { IGenreService } from '~/modules/genre/interfaces/genre.service.interface'
import { IGenreRepository } from '~/modules/genre/interfaces/genre.repository.interface'

@Injectable()
export class GenreService extends BaseService<Genre> implements IGenreService {
  constructor(
    @Inject('IGenreRepository')
    private readonly genreRepo: IGenreRepository
  ) {
    super(genreRepo)
  }
}
