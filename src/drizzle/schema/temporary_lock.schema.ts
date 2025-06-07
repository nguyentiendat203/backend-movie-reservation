import { relations } from 'drizzle-orm'
import { pgTable, uuid, timestamp } from 'drizzle-orm/pg-core'
import { Seat, User } from '~/drizzle/schema'
import { id, timestamps } from '~/drizzle/schema.helpers'

export const Temporary_Lock = pgTable('Temporary_Lock', {
  id,
  user_id: uuid()
    .notNull()
    .references(() => User.id),
  seat_id: uuid()
    .notNull()
    .references(() => Seat.id),
  locked_at: timestamp().defaultNow(),
  expires_at: timestamp().notNull(),
  ...timestamps
})

export const temporaryLockRelations = relations(Temporary_Lock, ({ one, many }) => ({
  seat: one(Seat, {
    fields: [Temporary_Lock.seat_id],
    references: [Seat.id]
  }),
  user: one(User, {
    fields: [Temporary_Lock.user_id],
    references: [User.id]
  })
}))
