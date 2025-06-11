import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateMovieDto } from './dto/create-movie.dto'
import { UpdateMovieDto } from './dto/update-movie.dto'
import { db } from '~/drizzle/db'
import { Movie, Genre } from '~/drizzle/schema'
import { eq, sql } from 'drizzle-orm'

@Injectable()
export class MovieService {
  async create(createMovieDto: CreateMovieDto) {
    await db.insert(Movie).values({ ...createMovieDto })
    return 'Create new movie successfully'
  }

  async findAll() {
    return await db.query.Movie.findMany({
      with: {
        genre: {
          columns: {
            name: true
          }
        }
      }
    })
  }

  async findAllByGenre(genre_id: string) {
    return await db.query.Movie.findMany({
      where: (Movie, { eq }) => eq(Movie.genre_id, genre_id)
    })
  }

  async findOne(id: string) {
    const movie = await db.query.Movie.findFirst({
      where: (Movie, { eq }) => eq(Movie.id, id),
      with: {
        genre: {
          columns: {
            name: true
          }
        }
      }
    })
    if (!movie) throw new NotFoundException('Movie not found!')
    return movie
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    const [result] = await db
      .update(Movie)
      .set({ ...updateMovieDto, updated_at: sql`NOW()` })
      .where(eq(Movie.id, id))
      .returning({ movie_id: Movie.id })
    return { ...result, message: 'Update movie succesfully' }
  }

  async remove(id: string) {
    await db.delete(Movie).where(eq(Movie.id, id))
    return { message: 'Delete movie succesfully' }
  }
}
