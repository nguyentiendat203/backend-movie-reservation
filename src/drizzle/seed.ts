import { seed } from 'drizzle-seed'
import { db } from '~/drizzle/db'
import * as schema from './schema'

async function main() {
  await seed(db, schema).refine((f) => ({
    User: {
      count: 10,
      with: {
        Reservation: 20
      }
    }
  }))
}
main()
