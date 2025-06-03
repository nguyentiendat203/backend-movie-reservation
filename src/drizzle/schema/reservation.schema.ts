import { relations } from 'drizzle-orm'
import { pgTable, uuid, decimal, timestamp, pgEnum } from 'drizzle-orm/pg-core'
import { id, timestamps } from '~/drizzle/schema.helpers'
import { Reservation_Seat } from '~/drizzle/schema/reservation_seat.schema'
import { Showtime } from '~/drizzle/schema/showtime.schema'
import { User } from '~/drizzle/schema/user.schema'

export const reservationStatusEnum = pgEnum('status', ['CONFIRMED', 'CANCELLED'])

export const Reservation = pgTable('Reservation', {
  id,
  user_id: uuid()
    .notNull()
    .references(() => User.id),
  showtime_id: uuid().references(() => Showtime.id),
  status: reservationStatusEnum().default('CONFIRMED'),
  total_price: decimal({ precision: 10, scale: 2 }).notNull(),
  ...timestamps
})

export const reservationRelations = relations(Reservation, ({ one, many }) => ({
  user: one(User, {
    fields: [Reservation.user_id],
    references: [User.id]
  }),
  reservationSeats: many(Reservation_Seat)
}))
