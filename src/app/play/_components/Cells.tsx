import { cx } from 'class-variance-authority'
import { useCallback, useEffect, useRef, useState } from 'react'
import { usePrevious } from 'react-use'

import { useIntersecting } from '../_hooks/useIntersecting'
import gameStore, { findPath, getAdj } from '../_store/store'
import styles from './play.module.css'

export default function Cells() {
  const currentWord = gameStore().currentWord
  const gameStarted = gameStore().gameStarted
  const tiles = gameStore().tiles
  const tileMap = gameStore().tileMap
  const { addLetterToWord, clearWord } = gameStore()
  const [adjCurrent, adjCurrentAssign] = useState<number[]>([])

  useEffect(() => {
    const lastLetter = currentWord[currentWord.length - 1]
    adjCurrentAssign(lastLetter == null ? [] : getAdj(lastLetter))
  }, [currentWord])

  useEffect(() => {
    const keydownHandler = (e: KeyboardEvent) => {
      if (!gameStarted) return
      if (!keyIsLetter(e.key)) return

      const key = e.key === 'q' ? 'QU' : e.key.toUpperCase()
      if (!tiles.includes(key)) return

      if (currentWord.length === 0) {
        const pos = keyToIndexes(tiles, key)[0]
        if (pos == null) return
        addLetterToWord(pos)
        adjCurrentAssign([...getAdj(pos)])
        return
      }

      const foundPath = findPath(tileMap)([
        ...currentWord.map(i => tiles[i] ?? ''),
        key,
      ])
      if (!foundPath) return

      clearWord()
      const lastLetter = [...foundPath.values()]
        .reverse()
        .map(addLetterToWord)
        .slice(-1)[0]
      adjCurrentAssign(lastLetter ? getAdj(lastLetter) : [])
    }

    window.addEventListener('keydown', keydownHandler)

    return () => window.removeEventListener('keydown', keydownHandler)
  }, [addLetterToWord, clearWord, currentWord, gameStarted, tileMap, tiles])

  return (
    <div className="col-span-4 row-span-4 grid select-none grid-cols-[repeat(4,var(--cell-size))] grid-rows-[repeat(4,var(--cell-size))] place-content-center gap-4 overflow-hidden">
      {tiles.map((tile, index) => (
        <Cell
          isAdjacent={adjCurrent.includes(index)}
          key={index}
          letter={tile}
          position={index}
        />
      ))}
    </div>
  )
}

function Cell({
  isAdjacent,
  letter,
  position,
}: {
  isAdjacent: boolean
  letter: string
  position: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const gameStarted = gameStore().gameStarted
  const currentWord = gameStore().currentWord
  const { addLetterToWord, removeLetterFromWord } = gameStore()

  const isWithinCell = useIntersecting(ref)
  const wasWithinCell = usePrevious(isWithinCell)

  const adjLineStyles = getAdjStyles(currentWord, position)
  const selectedState = currentWord.includes(position)
    ? 'selected'
    : isAdjacent
      ? 'adjacent'
      : ''

  const handleClick = useCallback(() => {
    if (!gameStarted) return
    if (!isWithinCell || isWithinCell === wasWithinCell) return
    if (!isWithinCell) return
    if (currentWord.length === 0 || isAdjacent) addLetterToWord(position)
    if (currentWord.includes(position)) removeLetterFromWord(position)
  }, [
    addLetterToWord,
    currentWord,
    gameStarted,
    isAdjacent,
    isWithinCell,
    position,
    removeLetterFromWord,
    wasWithinCell,
  ])

  useEffect(() => {
    if (!isWithinCell || isWithinCell === wasWithinCell) return
    handleClick()
  }, [handleClick, isWithinCell, letter, wasWithinCell])

  return (
    <div className="relative place-items-center">
      {adjLineStyles.map((style, i) => (
        <div
          key={i}
          className={cx(
            'absolute h-[5px] w-full bg-[--clr-adj-line]',
            styles[`adj--${style}`]
          )}
        />
      ))}

      <div
        className={cx(
          'absolute inset-0 rounded-lg bg-gradient-to-b  from-[--clr-from] to-[--clr-to]',
          styles.cell
        )}
        ref={ref}
        data-selected={selectedState}
      >
        <button
          className="absolute left-[2.5%] top-[2.5%] h-[95%] w-[95%] cursor-pointer rounded-[50%] border-none bg-[--clr-tile] text-xl font-bold text-[--clr-text-primary] outline-none"
          onClick={handleClick}
        >
          {letter}
        </button>
      </div>
    </div>
  )
}

function keyIsLetter(s: string) {
  return !!(s.length === 1 && s.toLowerCase().match(/[a-z]/))
}
function keyToIndexes(tiles: string[], tile: string) {
  return tiles.reduce(
    (indexes, t, index) => (t === tile ? [...indexes, index] : indexes),
    [] as number[]
  )
}
function getAdjStyles(word: number[], n: number) {
  if (!word.includes(n)) return []

  const index = word.indexOf(n)
  const wordSegment =
    index === 0 ? word.slice(0, 2) : word.slice(index - 1, index + 2)
  if (wordSegment.length < 1) return []
  return getAdj(n)
    .map(i => wordSegment.includes(i))
    .map((x, i) =>
      !x
        ? null
        : i === 4
          ? 'r'
          : i === 5
            ? 'bl'
            : i === 6
              ? 'b'
              : i === 7
                ? 'br'
                : null
    )
    .filter(Boolean)
}
