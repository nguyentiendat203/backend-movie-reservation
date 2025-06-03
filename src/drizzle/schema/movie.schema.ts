import { relations } from 'drizzle-orm'
import { pgTable, uuid, varchar, integer, decimal, text, date } from 'drizzle-orm/pg-core'
import { id, timestamps } from '~/drizzle/schema.helpers'
import { Genre } from '~/drizzle/schema/genre.schema'
import { Showtime } from '~/drizzle/schema/showtime.schema'

export const Movie = pgTable('Movie', {
  id,
  title: varchar({ length: 255 }).notNull(),
  director: varchar({ length: 255 }).notNull(),
  duration: integer().notNull(),
  poster: varchar({ length: 255 }).notNull(),
  rating: decimal({ precision: 10, scale: 2 }).default('4.0'),
  description: text(),
  genre_id: uuid()
    .notNull()
    .references(() => Genre.id),
  release_date: date().notNull(),
  trailer_url: varchar({ length: 255 }),
  ...timestamps
})

export const movieRelations = relations(Movie, ({ one, many }) => ({
  genre: one(Genre, {
    fields: [Movie.genre_id],
    references: [Genre.id]
  }),
  showtimes: many(Showtime)
}))
