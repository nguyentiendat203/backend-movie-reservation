import { relations } from 'drizzle-orm'
import { pgTable, uuid, integer, timestamp, varchar } from 'drizzle-orm/pg-core'
import { Seat } from '~/drizzle/schema'
import { id, timestamps } from '~/drizzle/schema.helpers'
import { Movie } from '~/drizzle/schema/movie.schema'

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
  seats: many(Seat)
}))
