import { defineConfig } from 'drizzle-kit'
import { env } from '~/common/config/environment'

export default defineConfig({
  out: './src/drizzle/migrations',
  schema: './src/drizzle/schema.ts',
  dialect: 'postgresql',
  verbose: true,
  strict: true,
  dbCredentials: {
    url: `postgres://${env.DB_USER}:${env.DB_PASSWORD}@localhost:${env.DB_PORT}/${env.DB_NAME}`,
    ssl: false
  }
})
