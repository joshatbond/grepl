'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { finishGame } from '~/server/data-layer/finishGame'

import { useMousePosition } from '../_hooks/useMousePosition'
import gameStore from '../_store/store'
import Cells from './Cells'
import ClearButton from './ClearButton'
import CurrentWord from './CurrentWord'
import RotateButton from './RotateButton'
import Score from './Score'
import StartButton from './StartButton'
import SubmitButton from './SubmitButton'
import Timer from './Timer'

export default function Game() {
  const { updatePointer } = gameStore()
  const gameStarted = gameStore().gameStarted
  const heatMap = gameStore().heatMap
  const tiles = gameStore().tiles
  const wordList = gameStore().wordList
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  useMousePosition(({ pageX, pageY }) => {
    updatePointer({ x: pageX, y: pageY })
  }, 200)

  useEffect(() => {
    const currentParams = new URLSearchParams(
      Array.from(searchParams.entries())
    )
    if (gameStarted) {
      currentParams.set('game', tiles.join(''))
    } else {
      currentParams.delete('game')
    }

    const query = currentParams.toString()
    router.push(`${pathname}${query ? `?${query}` : ''}`)
  }, [gameStarted, pathname, router, searchParams, tiles])

  useEffect(() => {
    if (gameStarted || !wordList.length) return

    finishGame({
      gameType: 'timed',
      heatMap,
      tiles: tiles.join(),
      words: wordList,
    }).catch(err => console.log(err))
  }, [gameStarted, heatMap, tiles, wordList])

  return (
    <div className="mt-6 flex items-center justify-center">
      <div className="grid touch-none select-none grid-cols-[repeat(4,var(--cell-size))] grid-rows-[repeat(7,var(--cell-size))] gap-4 text-visible [--cell-size:3rem] sm:mt-12 sm:grid-cols-[repeat(6,var(--cell-size))] sm:grid-rows-[repeat(6,var(--cell-size))]">
        <StartButton />

        <Timer />

        <Score />

        <RotateButton dir="cw" />

        <Cells />

        <ClearButton />

        <RotateButton dir="ccw" />

        <SubmitButton />

        <CurrentWord />

        {/* <div className="col-span-6 border text-center">Challenge</div> */}
      </div>
    </div>
  )
}
