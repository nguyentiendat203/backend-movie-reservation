import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Genre } from '~/modules/genre/entities/genre.entity'
import { IGenreRepository } from '~/modules/genre/interfaces/genre.repository.interface'
import { BaseRepository } from '~/shared/base/base.repository'

@Injectable()
export class GenreRepository extends BaseRepository<Genre> implements IGenreRepository {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepo: Repository<Genre>
  ) {
    super(genreRepo)
  }
}
