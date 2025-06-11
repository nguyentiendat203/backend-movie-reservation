import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { MovieService } from './movie.service'
import { CreateMovieDto } from './dto/create-movie.dto'
import { UpdateMovieDto } from './dto/update-movie.dto'

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto)
  }

  @Get()
  findAll() {
    return this.movieService.findAll()
  }

  @Get(':genre_id')
  findAllByGenre(@Param('genre_id') genre_id: string) {
    return this.movieService.findAllByGenre(genre_id)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.update(id, updateMovieDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieService.remove(id)
  }
}
