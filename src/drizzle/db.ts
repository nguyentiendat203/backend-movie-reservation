import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'

const db = drizzle('postgres://postgres:postgres@localhost:5432/reserve-movies')
export default db
