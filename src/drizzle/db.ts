import { drizzle } from 'drizzle-orm/node-postgres'
import { env } from '~/common/config/environment'
import * as schema from '~/drizzle/schema'

export const db = drizzle({
  schema,
  connection: `postgres://${env.DB_USER}:${env.DB_PASSWORD}@localhost:${env.DB_PORT}/${env.DB_NAME}`
})
