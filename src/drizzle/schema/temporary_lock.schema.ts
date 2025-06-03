import { relations } from 'drizzle-orm'
import { pgTable, uuid, timestamp } from 'drizzle-orm/pg-core'
import { id, timestamps } from '~/drizzle/schema.helpers'
import { Seat } from '~/drizzle/schema/seat.schema'
import { Showtime } from '~/drizzle/schema/showtime.schema'
import { User } from '~/drizzle/schema/user.schema'

export const Temporary_Lock = pgTable('Temporary_Lock', {
  id,
  user_id: uuid()
    .notNull()
    .references(() => User.id),
  showtime_id: uuid()
    .notNull()
    .references(() => Showtime.id),
  seat_id: uuid()
    .notNull()
    .references(() => Seat.id),
  locked_at: timestamp().defaultNow(),
  expires_at: timestamp().notNull(),
  ...timestamps
})

export const temporaryLockRelations = relations(Temporary_Lock, ({ one, many }) => ({
  showtime: one(Showtime, {
    fields: [Temporary_Lock.showtime_id],
    references: [Showtime.id]
  }),
  seat: one(Seat, {
    fields: [Temporary_Lock.seat_id],
    references: [Seat.id]
  }),
  user: one(User, {
    fields: [Temporary_Lock.user_id],
    references: [User.id]
  })
}))
