import { drizzle } from 'drizzle-orm/node-postgres'
import { env } from '~/common/config/environment'

export const db = drizzle({
  connection: {
    connectionString: `postgres://${env.DB_USER}:${env.DB_PASSWORD}@localhost:${env.DB_PORT}/${env.DB_NAME}`
  }
})
