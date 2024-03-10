export const diceBag: Dice[] = [
  ['A', 'A', 'E', 'E', 'G', 'N'],
  ['A', 'B', 'B', 'J', 'O', 'O'],
  ['A', 'C', 'H', 'O', 'P', 'S'],
  ['A', 'F', 'F', 'K', 'P', 'S'],
  ['A', 'O', 'O', 'T', 'T', 'W'],
  ['C', 'I', 'M', 'O', 'T', 'U'],
  ['D', 'E', 'I', 'L', 'R', 'X'],
  ['D', 'E', 'L', 'R', 'V', 'Y'],
  ['D', 'I', 'S', 'T', 'T', 'Y'],
  ['E', 'E', 'G', 'H', 'N', 'W'],
  ['E', 'E', 'I', 'N', 'S', 'U'],
  ['E', 'H', 'R', 'T', 'V', 'W'],
  ['E', 'I', 'O', 'S', 'S', 'T'],
  ['E', 'L', 'R', 'T', 'T', 'Y'],
  ['H', 'I', 'M', 'N', 'QU', 'U'],
  ['H', 'L', 'N', 'N', 'R', 'Z'],
]
const CWMap = [12, 8, 4, 0, 13, 9, 5, 1, 14, 10, 6, 2, 15, 11, 7, 3]
const CCWMap = [3, 7, 11, 15, 2, 6, 10, 14, 1, 5, 9, 13, 0, 4, 8, 12]

export function calculatePointsEarned(n: number): number {
  if (n < 3) return 0
  if (n < 5) return 1
  if (n === 5) return 2
  if (n === 6) return 3
  if (n === 7) return 5
  return 11
}
export function findFrequency(tiles: string[], words: number[][]) {
  return tiles.reduce(
    (map, _, index) => {
      const frequency = words.reduce((count, word) => {
        return count + word.filter(position => position === index).length
      }, 0)
      map[index] = frequency
      map.max = frequency > map.max ? frequency : map.max

      return map
    },
    { max: 0 } as HeatMap
  )
}
export function generateTileset() {
  return shuffle(diceBag).map(rollDice)
}
export function makeFindPath(adjFn: (n: number) => Adjacent) {
  return function (map: TileMap) {
    return function findPath(
      remainingTiles: string[],
      foundTiles = new Set<number>(),
      searchedTiles = new Set<number>(),
      currentTileMap?: [number, string[]][]
    ): Set<number> | undefined {
      const firstTile = remainingTiles[0]

      // if searchedTiles is undefined, and we have tiles left to search,
      //then this is the first run
      if (!currentTileMap) {
        // there are no tiles left to search
        if (!firstTile) return

        return findPath(
          remainingTiles.slice(1),
          foundTiles,
          searchedTiles,
          map[firstTile]
        )
      }

      // if we have no tiles left to search, return the found tiles
      if (!firstTile) {
        if (currentTileMap[0] != null) {
          return foundTiles.add(currentTileMap[0][0])
        }
        throw new Error('No tiles left to search, and had no tiles found')
      }

      // catch in case the firstTile isn't on the board
      const firstTileMap = map[firstTile]
      if (!firstTileMap) throw new Error('Tile not found on game board')

      // begin recursive (depth-first) search
      const possibleMatchPositions = currentTileMap
        .filter(([position, adjacentTiles]) => {
          return (
            adjacentTiles.includes(firstTile) &&
            !foundTiles.has(position) &&
            !searchedTiles.has(position)
          )
        })
        .map(match => match[0])

      for (const position of possibleMatchPositions) {
        searchedTiles.add(position)

        const untouchedNeighbors = firstTileMap.filter(([neighborPosition]) => {
          return foundTiles.has(neighborPosition) ||
            searchedTiles.has(neighborPosition)
            ? false
            : adjFn(neighborPosition).includes(position)
        })

        for (const neighbor of untouchedNeighbors) {
          const found = findPath(
            remainingTiles.slice(1),
            foundTiles,
            searchedTiles,
            [neighbor]
          )
          if (found) {
            found.forEach(f => foundTiles.add(f))
            break
          }
        }

        // if all the neighbors have been found, then this position is also a match
        if (foundTiles.size === remainingTiles.length)
          return foundTiles.add(position)

        // else search continues, get ready for the next iteration
        searchedTiles.delete(position)
      }
    }
  }
}
export function makeGetAdjacent(columns: number, rows: number) {
  return function makeGetAdjacent(position: number): Adjacent {
    const lowestPosition = 0
    const highestPosition = columns * rows
    if (
      position == null ||
      position < lowestPosition ||
      position > highestPosition
    )
      return [-1, -1, -1, -1, -1, -1, -1, -1]

    return [
      // top left
      position % columns === 0 || position < rows ? -1 : position - columns - 1,
      // top
      position < rows ? -1 : position - columns,
      // top right
      (position + 1) % columns === 0 || position < rows
        ? -1
        : position - columns + 1,
      // left
      position % columns === 0 ? -1 : position - 1,
      // right
      (position + 1) % columns === 0 ? -1 : position + 1,
      // bottom left
      position % columns === 0 || position > highestPosition - rows - 1
        ? -1
        : position + columns - 1,
      // bottom
      position > highestPosition - rows - 1 ? -1 : position + columns,
      // bottom right
      (position + 1) % columns === 0 || position > highestPosition - rows - 1
        ? -1
        : position + columns + 1,
    ]
  }
}
export function makeGetMap(getAdjFn: (n: number) => Adjacent) {
  return function getMap(tiles: string[]) {
    const indexToHash = makeIndexToHash(tiles, getAdjFn)

    return tiles.reduce((acc, tile) => {
      acc[tile] = keyToIndexes(tiles)(tile).map(indexToHash)
      return acc
    }, {} as TileMap)
  }
}
export function rotateGameTiles(tiles: string[], direction: 'cw' | 'ccw') {
  const dirMap = direction === 'cw' ? CWMap : CCWMap
  return dirMap.map(i => tiles[i]) as string[]
}
export function rotateTilePositions(tiles: number[], direction: 'cw' | 'ccw') {
  const dirMap = direction === 'cw' ? CWMap : CCWMap
  return tiles.map(i => dirMap.indexOf(i))
}
export function tilesToWord(indexes: number[], tiles: string[]) {
  return indexes.map(index => tiles[index]).join('')
}

function keyToIndexes(tiles: string[]) {
  return function (letter: string) {
    return tiles.reduce((indexes, tile, index) => {
      if (tile === letter) indexes.push(index)
      return indexes
    }, [] as number[])
  }
}
function makeIndexToHash(tiles: string[], adjFn: (n: number) => number[]) {
  return function indexToHash(index: number): [number, string[]] {
    return [index, adjFn(index).map(n => tiles[n] ?? '')]
  }
}
function randomInt(n: number) {
  return Math.floor(Math.random() * n)
}
function rollDice(dice: Dice) {
  const rolled = dice[randomInt(dice.length)]
  if (!rolled) throw new Error('Unable to roll dice')

  return rolled
}
function shuffle(bag: Dice[]) {
  bag.reverse().forEach((_, position) => {
    const rolled = randomInt(position + 1)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ;[bag[position], bag[rolled]] = swap([bag[position], bag[rolled]])
  })

  return bag
}
function swap([first, second]: [Dice, Dice]) {
  return [second, first]
}

export type HeatMap = Record<string, number> & { max: number }
export type TileMap = Record<string, [number, string[]][]>

type Dice = [string, string, string, string, string, string]
type Adjacent = [number, number, number, number, number, number, number, number]
