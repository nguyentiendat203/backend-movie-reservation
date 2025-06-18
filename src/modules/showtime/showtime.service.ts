import { Injectable } from '@nestjs/common'
import { CreateShowtimeDto } from './dto/create-showtime.dto'
import { UpdateShowtimeDto } from './dto/update-showtime.dto'
import { db } from '~/drizzle/db'
import { Seat, Showtime } from '~/drizzle/schema'
import { eq, isNull, sql } from 'drizzle-orm'

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
      where: (Showtime, { eq, and, isNull }) => and(eq(Showtime.movie_id, movie_id), isNull(Showtime.deleted_at))
    })
  }

  async findSeatsAvailableOfShowtime(showtime_id: string) {
    const seatsResered = await db.query.Reservation_Seat.findMany({
      columns: {
        seat_id: true
      }
    })
    return await db.query.Seat.findMany({
      with: {
        showtime: true
      },
      where: (Seat, { and, eq, notInArray }) =>
        and(
          eq(Seat.showtime_id, showtime_id),
          notInArray(
            Seat.id,
            seatsResered.map((item) => item.seat_id)
          )
        )
    })
  }

  async findSeatsBelongShowtime(showtime_id: string) {
    return await db.query.Seat.findMany({
      where: (Seat, { eq }) => eq(Seat.showtime_id, showtime_id)
    })
  }

  async findAll() {
    return await db.select().from(Showtime).where(isNull(Showtime.deleted_at))
  }

  async findOne(showtime_id: string) {
    const showtime = await db.query.Showtime.findFirst({
      where: (Showtime, { eq }) => eq(Showtime.id, showtime_id)
    })

    const seats = await db.query.Seat.findMany({
      where: (Seat, { eq }) => eq(Seat.showtime_id, showtime_id)
    })

    return { ...showtime, seats }
  }

  async update(id: string, updateShowtimeDto: UpdateShowtimeDto) {
    const [result] = await db
      .update(Showtime)
      .set({ ...updateShowtimeDto, updated_at: sql`NOW()` })
      .where(eq(Showtime.id, id))
      .returning({ showtime_id: Showtime.id })
    return { ...result, message: 'Update Showtime succesfully' }
  }

  async remove(id: string) {
    await db
      .update(Showtime)
      .set({ deleted_at: sql`NOW()` })
      .where(eq(Showtime.id, id))
    return { message: 'Delete succesfully' }
  }
}
