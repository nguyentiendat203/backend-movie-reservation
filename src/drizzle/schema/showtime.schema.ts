import { relations } from 'drizzle-orm'
import { pgTable, uuid, integer, timestamp, varchar } from 'drizzle-orm/pg-core'
import { Movie, Reservation, Seat, Temporary_Lock } from '~/drizzle/schema'
import { id, timestamps } from '~/drizzle/schema.helpers'

export const Showtime = pgTable('Showtime', {
  id,
  movie_id: uuid().references(() => Movie.id, { onDelete: 'cascade' }),
  start_time: timestamp({ withTimezone: true }).notNull(),
  end_time: timestamp({ withTimezone: true }).notNull(),
  capacity: integer().notNull(),
  location: varchar({ length: 255 }).notNull(),
  ...timestamps
})

export const showtimeRelations = relations(Showtime, ({ one, many }) => ({
  movie: one(Movie, {
    fields: [Showtime.movie_id],
    references: [Movie.id]
  }),
  reservation: one(Reservation),
  temporaryLocks: many(Temporary_Lock),
  seats: many(Seat)
}))
