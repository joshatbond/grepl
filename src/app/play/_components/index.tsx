'use client'

import { cx } from 'class-variance-authority'
import { Suspense } from 'react'

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
import styles from './play.module.css'

export default function Game() {
  const { updatePointer } = gameStore()
  useMousePosition(({ pageX, pageY }) => {
    updatePointer({ x: pageX, y: pageY })
  }, 200)

  return (
    <div className={styles.board}>
      <Suspense fallback={<SuspenseFallback />}>
        <StartButton />
      </Suspense>

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

function SuspenseFallback() {
  return <div className={cx([styles.btn, styles['btn--play']])}>Start</div>
}
