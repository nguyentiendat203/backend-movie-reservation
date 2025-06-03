import { relations } from 'drizzle-orm'
import { pgTable, varchar } from 'drizzle-orm/pg-core'
import { id, timestamps } from '~/drizzle/schema.helpers'
import { Room } from '~/drizzle/schema/room.schema'

export const Theater = pgTable('Theater', {
  id,
  name: varchar({ length: 255 }).notNull(),
  location: varchar({ length: 255 }).notNull(),
  ...timestamps
})

export const theaterRelations = relations(Theater, ({ many }) => ({
  rooms: many(Room)
}))
