import { pgTable, varchar } from 'drizzle-orm/pg-core'
import { id, timestamps } from '~/drizzle/schema.helpers'

export const Genre = pgTable('Genre', {
  id,
  name: varchar({ length: 255 }).notNull().unique(),
  ...timestamps
})
