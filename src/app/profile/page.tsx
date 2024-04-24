import { desc, eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'

import { env } from '~/env'
import { getCorbadoUser, getUserId } from '~/lib/auth'
import { db } from '~/server/db'
import { games } from '~/server/db/schema/games'

import Logout from '../_components/Logout'
import { calculatePointsEarned } from '../play/_store/utils'
import GameDate from './_components/GameDate'
import ThemeSelect from './_components/ThemeSelect'

export default async function Page() {
  try {
    const user = await getCorbadoUser()

    return <Profile userId={user.getID()} username={user.getEmail()} />
  } catch (error) {
    if (env.NODE_ENV === 'development') {
      return <Profile userId="SOME ID GOES HERE" username="foo@example.com" />
    }

    return redirect('/')
  }
}

function Profile({ userId, username }: { userId: string; username: string }) {
  return (
    <main className="mx-auto max-w-xl space-y-8 p-4">
      <section className="mb-4 flex justify-between">
        <h1 className="text-3xl">Profile Page</h1>

        <Logout />
      </section>

      <section>
        <h2 className="text-xl">User Info</h2>
        <hr className="mb-2 border-selectPlaceholder" />
        <div className="flex justify-between">
          <span>Id</span>
          <span>{userId}</span>
        </div>
        <div className="flex justify-between">
          <span>Email</span>
          <span>{username}</span>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <span>Theme</span>

          <ThemeSelect />
        </div>
      </section>

      <section>
        <h2 className="text-xl">Games Played</h2>
        <hr className="mb-2 border-selectPlaceholder" />

        <GameList />
      </section>
    </main>
  )
}
const mockData = [
  {
    id: 1,
    created_at: Date.now(),
    game_type: 'timed',
    heat_map: {
      '0': 3,
      '1': 17,
      '2': 19,
      '3': 3,
      '4': 10,
      '5': 26,
      '6': 19,
      '7': 5,
      '8': 3,
      '9': 10,
      '10': 2,
      '11': 0,
      '12': 1,
      '13': 0,
      '14': 0,
      '15': 1,
      max: 26,
    },
    tiles: 'ESTLPAEHTYEYEQUTS',
    user_id: 1,
    words_found: {
      words: [
        'EATS',
        'EAT',
        'ATE',
        'TEA',
        'YEAST',
        'YES',
        'STATE',
        'PASTEL',
        'PASTE',
        'PAS',
        'PAST',
        'STAT',
        'STAY',
        'AYES',
        'AYE',
        'EYES',
        'EYE',
        'TEAT',
        'LEAPS',
        'LEAP',
        'HEATS',
        'HEAT',
        'HEAP',
        'HEY',
        'YAP',
        'TAP',
        'SEAT',
        'THEY',
        'SATE',
        'SAT',
        'SAP',
      ],
    },
  },
] as {
  id: number
  created_at: number
  game_type: 'timed' | 'daily' | 'explorer'
  heat_map:
    | (Record<string, number> & {
        max: number
      })
    | null
  tiles: string
  user_id: number
  words_found: {
    words: string[]
  } | null
}[]

async function GameList() {
  let gamesPlayed
  if (env.NODE_ENV === 'development') {
    gamesPlayed = mockData
  } else {
    const user = await getUserId()
    if (!user) return null

    gamesPlayed = await db.query.games.findMany({
      where: eq(games.user_id, user.id),
      orderBy: desc(games.created_at),
    })
  }

  return (
    <div className="flex flex-col items-center gap-2">
      {gamesPlayed.map(game => (
        <div
          key={game.id}
          className="flex max-w-sm flex-col gap-2 rounded-lg border border-gray-700 p-4 text-neutral-100 shadow-md"
        >
          <div className="flex justify-between">
            <div>
              <p className="font-bold">{`${game.game_type[0]!.toUpperCase()}${game.game_type.slice(
                1
              )}`}</p>

              <GameDate time={game.created_at} />
              <p className="text-neutral-400">
                {new Date(game.created_at).toLocaleDateString()}
              </p>
            </div>

            <h2 className="text-4xl">{reduceScore(game.words_found?.words)}</h2>
          </div>

          <div className="mx-auto my-4 grid w-fit select-none grid-cols-4 grid-rows-4 gap-px">
            {generateTiles(game.tiles).map((tile, index) => {
              const opacity = game.heat_map
                ? (game.heat_map[index] ?? 0) / game.heat_map.max
                : 0

              return (
                <div
                  key={index}
                  className="relative flex h-8 w-8 items-center justify-center rounded bg-neutral-400 text-black"
                >
                  <span
                    className="absolute inset-0"
                    style={{
                      backgroundColor: `rgba(21 128 61 / ${opacity})`,
                    }}
                  />

                  <span className="absolute">{tile}</span>
                </div>
              )
            })}
          </div>

          <div>
            <h3 className="mb-2 border-b font-bold">Words Found</h3>
            <p className="text-neutral-400">
              {game.words_found?.words
                ?.filter(w => w.length > 2)
                .sort((a, b) => b.length - a.length)
                .join(' • ')}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

function reduceScore(as?: string[]) {
  if (!as) return 0
  return as.reduce((a, v) => a + calculatePointsEarned(v.length), 0)
}
function generateTiles(tiles: string) {
  const letters = tiles.split('')
  for (let i = letters.length; i >= 0; i--) {
    if (letters[i] === 'Q') {
      letters[i] = 'Qu'
      letters.splice(i + 1, 1)
    }
  }

  return letters
}
