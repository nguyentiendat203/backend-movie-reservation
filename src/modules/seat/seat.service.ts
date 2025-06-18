import { CreateSeatDto } from './dto/create-seat.dto'
import { UpdateSeatDto } from './dto/update-seat.dto'
import { CreateReservationDto } from '~/modules/reservation/dto/create-reservation.dto'
import { db } from '~/drizzle/db'
import { Seat, Temporary_Lock } from '~/drizzle/schema'
import { eq, lt, sql } from 'drizzle-orm'
import { ConflictException, Injectable } from '@nestjs/common'

const LOCK_DURATION_MINUTES = 5

@Injectable()
export class SeatService {
  create(createSeatDto: CreateSeatDto) {
    return 'This action adds a new seat'
  }

  async findAll() {
    return await db.query.Seat.findMany({
      where: (Seat, { isNull }) => isNull(Seat.deleted_at)
    })
  }

  async lockSeats(userId: string, body: CreateReservationDto) {
    const { showtime_id, seat_ids } = body
    const now = new Date()
    const expiresAt = new Date(Date.now() + LOCK_DURATION_MINUTES * 60 * 1000)

    // 1. Check if there are any Temporary_Lock rocords with expires_at less than now and delete
    await db.delete(Temporary_Lock).where(lt(Temporary_Lock.expires_at, now))

    // 2. Check if the seat is blocked by other users
    const existingLocks = await db.query.Temporary_Lock.findMany({
      where: (Temporary_Lock, { and, eq, inArray, gt }) =>
        and(eq(Temporary_Lock.showtime_id, showtime_id), inArray(Temporary_Lock.seat_id, seat_ids), gt(Temporary_Lock.expires_at, now))
    })

    if (existingLocks.length > 0) {
      throw new ConflictException('Seats already locked by other users')
    }

    // 3. Insert to table
    for (const seatId of seat_ids) {
      await db.insert(Temporary_Lock).values({
        user_id: userId,
        showtime_id,
        seat_id: seatId,
        locked_at: now,
        expires_at: expiresAt
      })
    }

    return { message: 'Seats locked successfully' }
  }

  async update(id: string, updateSeatDto: UpdateSeatDto) {
    const [result] = await db
      .update(Seat)
      .set({ ...updateSeatDto, updated_at: sql`NOW()` })
      .where(eq(Seat.id, id))
      .returning({ seat_id: Seat.id })
    return { ...result, message: 'Update succesfully' }
  }

  async remove(id: string) {
    await db
      .update(Seat)
      .set({ deleted_at: sql`NOW()` })
      .where(eq(Seat.id, id))
    return { message: 'Delete succesfully' }
  }
}
