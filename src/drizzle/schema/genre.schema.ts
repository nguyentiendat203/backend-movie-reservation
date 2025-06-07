import { relations } from 'drizzle-orm'
import { pgTable, varchar } from 'drizzle-orm/pg-core'
import { Movie } from '~/drizzle/schema'
import { id, timestamps } from '~/drizzle/schema.helpers'

export const Genre = pgTable('Genre', {
  id,
  name: varchar({ length: 255 }).notNull().unique(),
  ...timestamps
})

export const genreRelations = relations(Genre, ({ one, many }) => ({
  movies: many(Movie)
}))
