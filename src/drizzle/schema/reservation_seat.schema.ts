import { relations } from 'drizzle-orm'
import { pgTable, uuid, primaryKey } from 'drizzle-orm/pg-core'
import { Reservation, Seat } from '~/drizzle/schema'
import { timestamps } from '~/drizzle/schema.helpers'

export const Reservation_Seat = pgTable(
  'Reservation_Seat',
  {
    reservation_id: uuid()
      .notNull()
      .references(() => Reservation.id, { onDelete: 'cascade' }),
    seat_id: uuid()
      .notNull()
      .references(() => Seat.id),
    ...timestamps
  },
  (t) => [primaryKey({ columns: [t.reservation_id, t.seat_id] })]
)

export const reservationSeatRelations = relations(Reservation_Seat, ({ one }) => ({
  reservation: one(Reservation, {
    fields: [Reservation_Seat.reservation_id],
    references: [Reservation.id]
  }),
  seat: one(Seat, {
    fields: [Reservation_Seat.seat_id],
    references: [Seat.id]
  })
}))
