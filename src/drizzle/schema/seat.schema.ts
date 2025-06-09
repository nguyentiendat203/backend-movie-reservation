import { relations } from 'drizzle-orm'
import { pgTable, uuid, pgEnum, boolean as pgBoolean, decimal, varchar } from 'drizzle-orm/pg-core'
import { Reservation_Seat, Showtime, Temporary_Lock } from '~/drizzle/schema'
import { id, timestamps } from '~/drizzle/schema.helpers'

export const seatTypes = ['NORMAL', 'VIP'] as const
export type SeatType = (typeof seatTypes)[number]
export const seatTypeEnum = pgEnum('seat_status_type', seatTypes)

export const Seat = pgTable('Seat', {
  id,
  showtime_id: uuid()
    .notNull()
    .references(() => Showtime.id),
  seat_name: varchar({ length: 255 }).notNull(),
  seat_type: seatTypeEnum().default('NORMAL'),
  price: decimal({ precision: 10, scale: 2 }).notNull().default('50000.00'),
  is_active: pgBoolean().default(true),
  ...timestamps
})

export const seatRelations = relations(Seat, ({ one, many }) => ({
  reservationSeats: many(Reservation_Seat),
  temporaryLocks: many(Temporary_Lock),
  showtime: one(Showtime, {
    fields: [Seat.showtime_id],
    references: [Showtime.id]
  })
}))
