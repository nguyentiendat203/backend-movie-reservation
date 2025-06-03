import { relations } from 'drizzle-orm'
import { pgTable, uuid, integer, timestamp, decimal } from 'drizzle-orm/pg-core'
import { id, timestamps } from '~/drizzle/schema.helpers'
import { Movie } from '~/drizzle/schema/movie.schema'
import { Room } from '~/drizzle/schema/room.schema'
import { Temporary_Lock } from '~/drizzle/schema/temporary_lock.schema'

export const Showtime = pgTable('Showtime', {
  id,
  movie_id: uuid().references(() => Movie.id),
  room_id: uuid().references(() => Room.id),
  start_time: timestamp(),
  ticket_price: decimal({ precision: 10, scale: 2 }),
  ...timestamps
})

export const showtimeRelations = relations(Showtime, ({ one, many }) => ({
  movie: one(Movie, {
    fields: [Showtime.movie_id],
    references: [Movie.id]
  }),
  room: one(Room, {
    fields: [Showtime.room_id],
    references: [Room.id]
  }),
  temporaryLocks: many(Temporary_Lock)
}))
