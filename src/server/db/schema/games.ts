import { sql } from 'drizzle-orm'
import { integer, text } from 'drizzle-orm/sqlite-core'

import { createTable } from '../createTable'
import { users } from './users'

export const games = createTable('games', {
  id: integer('id').notNull().primaryKey(),
  created_at: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  game_type: text('game_type', {
    enum: ['timed', 'daily', 'explorer'],
  }).notNull(),
  tiles: text('tiles').notNull(),
  user_id: integer('user_id')
    .notNull()
    .references(() => users.id),
  words_found: text('words_found', { mode: 'json' }).$type<{
    words: string[]
  }>(),
})
