import { BadRequestException, Injectable } from '@nestjs/common'
import { UpdateReservationDto } from './dto/update-reservation.dto'
import { IUser } from '~/modules/user/interfaces/user.interface'
import { db } from '~/drizzle/db'
import { Reservation, Reservation_Seat, Seat, Showtime, User } from '~/drizzle/schema'
import { and, eq, inArray, lt, sql } from 'drizzle-orm'
import { CreateReservationDto } from '~/modules/reservation/dto/create-reservation.dto'
import { IReservation } from '~/modules/reservation/interfaces/reservation.interface'

@Injectable()
export class ReservationService {
  async reserShowtime(user: IUser, body: IReservation) {
    const { showtime_id, seat_ids } = body

    return await db.transaction(async (tx) => {
      // 1. Get list seats following ID
      const selectedSeats = await tx.select().from(Seat).where(inArray(Seat.id, seat_ids))

      if (selectedSeats.length !== seat_ids.length) {
        throw new BadRequestException('One or more seats are invalid')
      }

      // 2. Check seats are belongs to showtime
      const allBelongToShowtime = selectedSeats.every((seat) => seat.showtime_id === showtime_id)
      if (!allBelongToShowtime) {
        throw new BadRequestException('Some seats do not belong to the given showtime')
      }

      // 3. Check seats have already been reserved
      const reservedSeats = await tx
        .select({ seat_id: Reservation_Seat.seat_id })
        .from(Reservation_Seat)
        .innerJoin(Seat, eq(Seat.id, Reservation_Seat.seat_id))
        .where(and(inArray(Reservation_Seat.seat_id, seat_ids), eq(Seat.showtime_id, showtime_id)))

      if (reservedSeats.length > 0) {
        throw new BadRequestException('One or more seats have already been reserved')
      }

      // 4. Calculate total price
      const total_price = selectedSeats.reduce((sum, seat) => {
        return sum + parseFloat(seat.price)
      }, 0)

      // 5. Create Reservation
      const [reservation] = await tx
        .insert(Reservation)
        .values({
          user_id: user.id,
          total_price: total_price.toFixed(2)
        })
        .returning()

      // 6. Create Reservation_Seat
      const reservationSeats = seat_ids.map((seat_id) => ({
        reservation_id: reservation.id,
        seat_id
      }))

      await tx.insert(Reservation_Seat).values(reservationSeats)

      return {
        message: 'Reserving successfully',
        reservation_id: reservation.id
      }
    })
  }

  async create(showtime_id: string) {
    const seats = await db.select().from(Seat).where(eq(Seat.showtime_id, showtime_id))
    return { seats }
  }
  findAll() {
    return `This action returns all reservation`
  }

  findOne(id: number) {
    return `This action returns a #${id} reservation`
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return `This action updates a #${id} reservation`
  }

  remove(id: number) {
    return `This action removes a #${id} reservation`
  }
}
