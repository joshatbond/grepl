import { sql } from 'drizzle-orm'
import { integer, text } from 'drizzle-orm/sqlite-core'

import { createTable } from '../createTable'

export const users = createTable('users', {
  id: integer('id').primaryKey().notNull(),
  corbadoId: text('auth_id').notNull(),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
})
