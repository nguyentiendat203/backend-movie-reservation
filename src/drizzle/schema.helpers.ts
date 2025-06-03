import { timestamp, uuid } from 'drizzle-orm/pg-core'

export const id = uuid().primaryKey().notNull().defaultRandom()
export const timestamps = {
  created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updated_at: timestamp({ withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
}
