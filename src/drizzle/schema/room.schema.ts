import { relations } from 'drizzle-orm'
import { pgTable, uuid, varchar, integer } from 'drizzle-orm/pg-core'
import { id, timestamps } from '~/drizzle/schema.helpers'
import { Seat } from '~/drizzle/schema/seat.schema'
import { Showtime } from '~/drizzle/schema/showtime.schema'
import { Theater } from '~/drizzle/schema/theater.schema'

export const Room = pgTable('Room', {
  id,
  theater_id: uuid()
    .notNull()
    .references(() => Theater.id),
  name: varchar({ length: 255 }).notNull(),
  seat_count: integer().notNull(),
  ...timestamps
})

export const roomRelations = relations(Room, ({ one, many }) => ({
  showtimes: many(Showtime),
  seats: many(Seat),
  theater: one(Theater, {
    fields: [Room.theater_id],
    references: [Theater.id]
  })
}))
