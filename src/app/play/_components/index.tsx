'use client'

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
  useMousePosition(({ pageX, pageY }) => {
    updatePointer({ x: pageX, y: pageY })
  }, 200)

  return (
    <div className="mt-12 grid touch-none select-none grid-cols-[repeat(6,var(--cell-size))] grid-rows-[repeat(6,var(--cell-size))] place-content-center gap-4 text-visible [--cell-size:3rem]">
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
  )
}
