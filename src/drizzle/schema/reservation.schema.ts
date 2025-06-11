import { relations } from 'drizzle-orm'
import { pgTable, uuid, decimal, timestamp, pgEnum } from 'drizzle-orm/pg-core'
import { Reservation_Seat, Showtime, User } from '~/drizzle/schema'
import { id, timestamps } from '~/drizzle/schema.helpers'

export const reservationStatus = ['CONFIRMED', 'CANCELLED'] as const
export type ReservationStatusType = (typeof reservationStatus)[number]
export const reservationStatusEnum = pgEnum('reservation_status_type', reservationStatus)

export const Reservation = pgTable('Reservation', {
  id,
  user_id: uuid()
    .notNull()
    .references(() => User.id),
  showtime_id: uuid()
    .notNull()
    .references(() => Showtime.id),
  status: reservationStatusEnum().default('CONFIRMED'),
  total_price: decimal({ precision: 10, scale: 2 }).notNull(),
  ...timestamps
})

export const reservationRelations = relations(Reservation, ({ one, many }) => ({
  user: one(User, {
    fields: [Reservation.user_id],
    references: [User.id]
  }),
  showtime: one(Showtime, {
    fields: [Reservation.showtime_id],
    references: [Showtime.id]
  }),
  reservationSeats: many(Reservation_Seat)
}))
