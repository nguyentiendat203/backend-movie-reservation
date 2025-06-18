import { sql } from 'drizzle-orm'
import { timestamp, uuid } from 'drizzle-orm/pg-core'

export const id = uuid().primaryKey().notNull().defaultRandom()
export const timestamps = {
  created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
  deleted_at: timestamp().default(sql`null`),
  updated_at: timestamp({ withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
}
