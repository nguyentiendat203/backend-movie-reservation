import { relations } from 'drizzle-orm'
import { pgTable, uuid, varchar, integer, decimal, text, date } from 'drizzle-orm/pg-core'
import { Genre, Showtime } from '~/drizzle/schema'
import { id, timestamps } from '~/drizzle/schema.helpers'

export const Movie = pgTable('Movie', {
  id,
  title: varchar({ length: 255 }).notNull(),
  duration: integer().notNull(),
  poster: varchar({ length: 255 }).notNull(),
  description: text(),
  genre_id: uuid()
    .notNull()
    .references(() => Genre.id),
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
