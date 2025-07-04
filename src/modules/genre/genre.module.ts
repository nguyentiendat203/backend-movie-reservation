import { Module } from '@nestjs/common'
import { GenreService } from './genre.service'
import { GenreController } from './genre.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Genre } from '~/modules/genre/entities/genre.entity'
import { GenreRepository } from '~/modules/genre/repositories/genre.repository'

@Module({
  imports: [TypeOrmModule.forFeature([Genre])],
  controllers: [GenreController],
  providers: [
    GenreService,
    {
      provide: 'IGenreRepository',
      useClass: GenreRepository
    }
  ],
  exports: ['IGenreRepository']
})
export class GenreModule {}
