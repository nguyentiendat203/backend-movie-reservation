import { Controller, Get, Post, Body } from '@nestjs/common'
import { GenreService } from './genre.service'
import { CreateGenreDto } from './dto/create-genre.dto'

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Post()
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genreService.create(createGenreDto)
  }

  @Get()
  findAll() {
    return this.genreService.findAll()
  }
}
