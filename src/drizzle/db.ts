import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'

export const db = drizzle({
  connection: {
    connectionString: `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`
  }
})
