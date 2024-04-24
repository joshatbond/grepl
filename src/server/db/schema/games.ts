import { sql } from 'drizzle-orm'
import { integer, text } from 'drizzle-orm/sqlite-core'

import { HeatMap } from '~/app/play/_store/utils'

import { createTable } from '../createTable'
import { users } from './users'

const gameTypes = ['timed', 'daily', 'explorer'] as const

export const games = createTable('games', {
  id: integer('id').notNull().primaryKey(),
  created_at: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  game_type: text('game_type', {
    enum: gameTypes,
  }).notNull(),
  heat_map: text('words_found', { mode: 'json' }).$type<HeatMap>(),
  tiles: text('tiles').notNull(),
  user_id: integer('user_id')
    .notNull()
    .references(() => users.id),
  words_found: text('words_found', { mode: 'json' }).$type<{
    words: string[]
  }>(),
})

export type GameType = (typeof gameTypes)[number]
