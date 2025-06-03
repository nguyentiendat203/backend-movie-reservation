import { relations } from 'drizzle-orm'
import { pgTable, uuid, char, integer, pgEnum, boolean as pgBoolean } from 'drizzle-orm/pg-core'
import { id } from '~/drizzle/schema.helpers'
import { Reservation_Seat } from '~/drizzle/schema/reservation_seat.schema'
import { Room } from '~/drizzle/schema/room.schema'
import { Temporary_Lock } from '~/drizzle/schema/temporary_lock.schema'

export const seatTypeEnum = pgEnum('seat_type', ['NORMAL', 'VIP'])

export const Seat = pgTable('Seat', {
  id,
  room_id: uuid()
    .notNull()
    .references(() => Room.id),
  row: char({ length: 1 }).notNull(),
  seat_number: integer().notNull(),
  seat_type: seatTypeEnum().default('NORMAL'),
  is_active: pgBoolean().default(true)
})

export const seatRelations = relations(Seat, ({ one, many }) => ({
  reservationSeats: many(Reservation_Seat),
  temporaryLocks: many(Temporary_Lock),
  room: one(Room, {
    fields: [Seat.room_id],
    references: [Room.id]
  })
}))
