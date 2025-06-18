import { Controller, Get, Post, Body, Patch, Param, Delete, Query, DefaultValuePipe, ParseIntPipe, UseGuards } from '@nestjs/common'
import { MovieService } from './movie.service'
import { CreateMovieDto } from './dto/create-movie.dto'
import { UpdateMovieDto } from './dto/update-movie.dto'
import { MoviesFilter } from '~/modules/movie/interfaces/movie.interface'
import { JwtAccessTokenGuard } from '~/modules/auth/guards/jwt-access-token.guard'
import { Roles } from '~/decorators/role.decorator'
import { UserRole } from '~/modules/auth/dto/create-auth.dto'
import { RolesGuard } from '~/modules/auth/guards/roles.guard'

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAccessTokenGuard)
  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto)
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('category') category: string,
    @Query('title') title: string
  ) {
    const filter: MoviesFilter = {
      category,
      title
    }
    return this.movieService.findAll(page, limit, filter)
  }

  @Get(':genre_id')
  findAllByGenre(@Param('genre_id') genre_id: string) {
    return this.movieService.findAllByGenre(genre_id)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieService.findOne(id)
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAccessTokenGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.update(id, updateMovieDto)
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAccessTokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieService.remove(id)
  }
}
