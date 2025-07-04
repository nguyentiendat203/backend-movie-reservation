import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query, DefaultValuePipe, ParseIntPipe, UseGuards } from '@nestjs/common'
import { MovieService } from './movie.service'
import { CreateMovieDto } from './dto/create-movie.dto'
import { UpdateMovieDto } from './dto/update-movie.dto'
import { JwtAccessTokenGuard } from '~/modules/auth/guards/jwt-access-token.guard'
import { Roles } from '~/decorators/role.decorator'
import { RolesGuard } from '~/modules/auth/guards/roles.guard'
import { Public } from '~/decorators/auth.decorator'
import { Role } from '~/common/types'

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAccessTokenGuard)
  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto)
  }

  @Public()
  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit: number
  ) {
    return this.movieService.findAll({
      page,
      limit,
      relations: { genre: true },
      select: {
        genre: {
          name: true
        }
      }
    })
  }

  @Get('genre/:genre_id')
  findAllByGenre(@Param('genre_id', ParseUUIDPipe) genre_id: string) {
    return this.movieService.findAllByGenre(genre_id)
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.movieService.findOneById(id)
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.update(id, updateMovieDto)
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.movieService.softRemove(id)
  }
}
