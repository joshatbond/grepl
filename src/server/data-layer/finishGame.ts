'use server'

import { type HeatMap } from '~/app/play/_store/utils'
import { getUserId } from '~/lib/auth'

import { db } from '../db'
import { type GameType, games } from '../db/schema/games'

export async function finishGame({
  gameType,
  heatMap,
  tiles,
  words,
}: {
  gameType: GameType
  heatMap: HeatMap
  tiles: string
  words: string[]
}) {
  try {
    const user = await getUserId()
    if (!user) throw new Error('User not logged in')

    await db.insert(games).values({
      game_type: gameType,
      heat_map: heatMap,
      tiles,
      user_id: user.id,
      words_found: { words },
    })
  } catch (error) {
    console.log(error)
  }
}
