import { relations } from 'drizzle-orm'
import { pgTable, varchar, pgEnum } from 'drizzle-orm/pg-core'
import { id, timestamps } from '~/drizzle/schema.helpers'
import { Reservation } from '~/drizzle/schema/reservation.schema'
import { Temporary_Lock } from '~/drizzle/schema/temporary_lock.schema'

export const userRoles = ['USER', 'ADMIN'] as const
export type UserRole = (typeof userRoles)[number]
export const userRoleEnum = pgEnum('user_role', userRoles)

export const User = pgTable('User', {
  id,
  first_name: varchar({ length: 255 }).notNull(),
  last_name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  role: userRoleEnum().default('USER'),
  refresh_token_hash: varchar({ length: 255 }),
  ...timestamps
})

export const userRelations = relations(User, ({ one, many }) => ({
  temporaryLocks: many(Temporary_Lock),
  reservarions: many(Reservation)
}))
