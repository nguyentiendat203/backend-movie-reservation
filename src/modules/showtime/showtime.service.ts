import { Injectable } from '@nestjs/common'
import { CreateShowtimeDto } from './dto/create-showtime.dto'
import { UpdateShowtimeDto } from './dto/update-showtime.dto'
import { db } from '~/drizzle/db'
import { Seat, Showtime } from '~/drizzle/schema'

@Injectable()
export class ShowtimeService {
  async create(createShowtimeDto: CreateShowtimeDto) {
    const { capacity, ...rest } = createShowtimeDto

    // Step 1: Insert Showtime & get inserted ID
    const [showtime] = await db
      .insert(Showtime)
      .values({
        ...rest,
        start_time: new Date(createShowtimeDto.start_time),
        end_time: new Date(createShowtimeDto.end_time),
        capacity
      })
      .returning({ id: Showtime.id })

    // Step 2: Auto create seats
    const seats = Array.from({ length: capacity }).map((_, index) => ({
      showtime_id: showtime.id,
      seat_name: `Seat ${index + 1}`,
      is_active: true
    }))
    await db.insert(Seat).values(seats)

    return { message: 'Showtime & Seats created successfully' }
  }

  async findAllShowtimeOfMovie(movie_id: string) {
    return await db.query.Showtime.findMany({
      where: (Showtime, { eq }) => eq(Showtime.movie_id, movie_id)
    })
  }

  findAll() {
    return `This action returns all showtime`
  }

  findOne(id: number) {
    return `This action returns a #${id} showtime`
  }

  update(id: number, updateShowtimeDto: UpdateShowtimeDto) {
    return `This action updates a #${id} showtime`
  }

  remove(id: number) {
    return `This action removes a #${id} showtime`
  }
}
