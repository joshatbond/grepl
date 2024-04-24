import createStore from '~/lib/createStore'

import {
  type HeatMap,
  type TileMap,
  calculatePointsEarned,
  findFrequency,
  generateTileset,
  makeFindPath,
  makeGetAdjacent,
  makeGetMap,
  rotateGameTiles,
  rotateTilePositions,
  tilesToWord,
} from './utils'

const GAME_COLS = 4
const GAME_ROWS = 4
const _heatMap = { max: 0 }
const _tiles = Array(GAME_COLS * GAME_ROWS).fill('') as string[]
const _pointer: Pointer = { x: null, y: null }
const longEnough = (s: string): boolean => s.length > 2

const gameStore = createStore(
  'game',
  {
    alreadyFound: false,
    currentWord: [] as number[],
    gameStarted: false,
    heatMap: {} as HeatMap,
    maxTime: 180,
    pointer: _pointer,
    score: 0,
    tiles: _tiles,
    tileMap: {} as TileMap,
    wasIncorrectWord: false,
    wordList: [] as string[],
    words: [] as number[][],
  },
  set => ({
    addLetterToWord: (pos: number) => {
      set(
        state => {
          state.wasIncorrectWord = false
          state.alreadyFound = false
          if (!state.currentWord.includes(pos)) state.currentWord.push(pos)
        },
        false,
        'game/addLetterToWord'
      )
    },
    addWordToList: () => {
      set(
        state => {
          const _w = tilesToWord(state.currentWord, state.tiles)

          state.wordList = [_w, ...state.wordList].filter(longEnough)
          state.words = [state.currentWord, ...state.words]
          state.score += calculatePointsEarned(_w.length)
          state.currentWord = []
          state.heatMap = findFrequency(state.tiles, state.words)
        },
        false,
        'game/addWordToList'
      )
    },
    backspace: () => {
      set(
        state => {
          state.currentWord.pop()
        },
        false,
        'game/backspace'
      )
    },
    clearWord: () => {
      set(
        state => {
          state.currentWord = []
        },
        false,
        'game/clearWord'
      )
    },
    endGame: () => {
      set(
        state => {
          state.gameStarted = false
          state.currentWord = []
        },
        false,
        'game/gameEnd'
      )
    },
    removeLetterFromWord: (pos: number) => {
      set(
        state => {
          state.currentWord.splice(pos)
        },
        false,
        'game/removeLetterFromWord'
      )
    },
    rotateTiles: (dir: 'cw' | 'ccw') => {
      set(
        state => {
          const _tiles = rotateGameTiles(state.tiles, dir)
          state.tiles = _tiles
          state.tileMap = getMap(_tiles)
          state.currentWord = rotateTilePositions(state.currentWord, dir)
        },
        false,
        'game/rotateTiles'
      )
    },
    startGame: (tiles?: string) => {
      set(
        state => {
          const _tiles = tiles
            ? tiles.toUpperCase().split('')
            : generateTileset()

          state.currentWord = []
          state.gameStarted = true
          state.heatMap = _heatMap
          state.pointer = _pointer
          state.score = 0
          state.tiles = _tiles
          state.tileMap = getMap(_tiles)
          state.wordList = []
          state.words = []
        },
        false,
        'game/gameStart'
      )
    },
    toggleAlreadyFound: (was?: boolean) => {
      set(
        state => {
          state.alreadyFound = was ? was : !state.alreadyFound
        },
        false,
        'game/toggleAlreadyFound'
      )
    },
    toggleIncorrectWord: (was?: boolean) => {
      set(
        state => {
          state.wasIncorrectWord = was ? was : !state.wasIncorrectWord
        },
        false,
        'game/toggleIncorrectWord'
      )
    },
    updatePointer: ({ x, y }: Pointer) => {
      set(
        state => {
          state.pointer = { x, y }
        },
        false,
        'game/pointerUpdate'
      )
    },
  })
)

export default gameStore
export const getAdj = makeGetAdjacent(GAME_COLS, GAME_ROWS)
export const getMap = makeGetMap(getAdj)
export const findPath = makeFindPath(getAdj)
export type Pointer = { x: number | null; y: number | null }
