import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateMovieDto } from './dto/create-movie.dto'
import { UpdateMovieDto } from './dto/update-movie.dto'
import { db } from '~/drizzle/db'
import { Movie } from '~/drizzle/schema'
import { asc, count, eq, isNull, sql } from 'drizzle-orm'
import { MoviesFilter } from '~/modules/movie/interfaces/movie.interface'

@Injectable()
export class MovieService {
  async create(createMovieDto: CreateMovieDto) {
    await db.insert(Movie).values({ ...createMovieDto })
    return 'Create new movie successfully'
  }

  async findAll(page: number, limit: number, filter: MoviesFilter) {
    const { category, title } = filter
    const offset = (page - 1) * limit

    const movies = await db.query.Movie.findMany({
      limit,
      offset,
      where: (movie, { eq, ilike, and }) => {
        if (category) {
          return and(eq(movie.genre_id, category), isNull(Movie.deleted_at))
        }
        if (title) {
          return and(ilike(movie.title, `%${title}%`), isNull(Movie.deleted_at))
        }
        return isNull(Movie.deleted_at)
      },
      with: {
        genre: {
          columns: {
            name: true
          }
        }
      },
      orderBy: [asc(Movie.created_at)]
    })

    const [totalResult] = await db.select({ count: count() }).from(Movie).where(isNull(Movie.deleted_at))

    return {
      page,
      limit,
      totalPages: Math.ceil(totalResult?.count / limit),
      totalRecords: totalResult?.count,
      data: movies
    }
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
    await db
      .update(Movie)
      .set({ deleted_at: sql`NOW()` })
      .where(eq(Movie.id, id))
    return { message: 'Delete movie succesfully' }
  }
}
