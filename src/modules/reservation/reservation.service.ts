import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { and, eq, inArray } from 'drizzle-orm'
import { IReservation } from '~/modules/reservation/interfaces/reservation.interface'

@Injectable()
export class ReservationService {
  // async reserShowtime(user: IUser, body: IReservation) {
  //   const { showtime_id, seat_ids } = body
  //   return await db.transaction(async (tx) => {
  //     // 1. Get list seats following ID
  //     const selectedSeats = await tx.select().from(Seat).where(inArray(Seat.id, seat_ids))
  //     if (selectedSeats.length !== seat_ids.length) {
  //       throw new BadRequestException('One or more seats are invalid')
  //     }
  //     // 2. Check seats are belongs to showtime
  //     const allBelongToShowtime = selectedSeats.every((seat) => seat.showtime_id === showtime_id)
  //     if (!allBelongToShowtime) {
  //       throw new BadRequestException('Some seats do not belong to the given showtime')
  //     }
  //     // 3. Check seats have already been reserved
  //     const reservedSeats = await tx
  //       .select({ seat_id: Reservation_Seat.seat_id, seat_name: Seat.seat_name })
  //       .from(Reservation_Seat)
  //       .innerJoin(Seat, eq(Seat.id, Reservation_Seat.seat_id))
  //       .where(and(inArray(Reservation_Seat.seat_id, seat_ids), eq(Seat.showtime_id, showtime_id)))
  //     if (reservedSeats.length > 0) {
  //       throw new BadRequestException(`Seats already reserved: ${reservedSeats.map((r) => r.seat_name).join(', ')}`)
  //     }
  //     // 4. Calculate total price
  //     const total_price = selectedSeats.reduce((sum, seat) => {
  //       return sum + parseFloat(seat.price)
  //     }, 0)
  //     // 5. Create Reservation
  //     const [reservation] = await tx
  //       .insert(Reservation)
  //       .values({
  //         user_id: user.id,
  //         showtime_id,
  //         total_price: total_price.toFixed(2)
  //       })
  //       .returning()
  //     // 6. Create Reservation_Seat
  //     const reservationSeats = seat_ids.map((seat_id) => ({
  //       reservation_id: reservation.id,
  //       seat_id
  //     }))
  //     await tx.insert(Reservation_Seat).values(reservationSeats)
  //     return {
  //       message: 'Reserving successfully',
  //       reservation_id: reservation.id
  //     }
  //   })
  // }
  // async findMyReservation(user: IUser) {
  //   const results = await db.query.Reservation.findMany({
  //     where: (Reservation, { eq }) => eq(Reservation.user_id, user.id),
  //     with: {
  //       showtime: true,
  //       reservationSeats: {
  //         columns: {
  //           seat_id: true
  //         },
  //         with: {
  //           seat: true
  //         }
  //       }
  //     }
  //   })
  //   return results
  // }
  // async cancelShowtimeResered(reser_id: string) {
  //   // 1. Find Reservation
  //   const reservation = await db.query.Reservation.findFirst({
  //     where: (Reservation, { eq }) => eq(Reservation.id, reser_id),
  //     with: {
  //       showtime: {
  //         columns: {
  //           start_time: true
  //         }
  //       }
  //     }
  //   })
  //   if (!reservation) {
  //     throw new NotFoundException('Reservation not found')
  //   }
  //   const startTime = new Date(reservation.showtime.start_time)
  //   const now = new Date()
  //   if (startTime <= now) {
  //     throw new BadRequestException('Cannot cancel past or ongoing reservations')
  //   }
  //   await db.update(Reservation).set({ status: 'CANCELLED' }).where(eq(Reservation.id, reser_id))
  //   return {
  //     message: 'Reservation cancelled successfully',
  //     reservation_id: reser_id
  //   }
  // }
  // async findAll() {
  //   return await db.query.Reservation.findMany({
  //     with: {
  //       showtime: {
  //         columns: {
  //           id: false,
  //           updated_at: false
  //         }
  //       },
  //       user: {
  //         columns: {
  //           id: false,
  //           updated_at: false,
  //           deleted_at: false,
  //           password: false,
  //           refresh_token_hash: false
  //         }
  //       }
  //     }
  //   })
  // }
}
