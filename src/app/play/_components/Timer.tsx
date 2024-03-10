import { cx } from 'class-variance-authority'
import { useEffect, useState } from 'react'

import gameStore from '../_store/store'

export default function Timer() {
  const duration = gameStore().maxTime
  const isGameStarted = gameStore().gameStarted
  const endGame = gameStore().endGame

  const [timeLeft, timeLeftAssign] = useState(-1)

  const timeIndicator =
    timeLeft < 0
      ? ''
      : timeLeft <= duration / 4
        ? 'danger'
        : timeLeft <= duration / 2
          ? 'warning'
          : ''

  const timeString =
    timeLeft > 0
      ? `${Math.floor(timeLeft / 60)
          .toString()
          .padStart(2, '0')}:${Math.floor(timeLeft % 60)
          .toString()
          .padStart(2, '0')}`
      : '--:--'

  useEffect(() => {
    if (!isGameStarted) {
      if (timeLeft > -1) timeLeftAssign(-1)
      return
    }
    if (isGameStarted && timeLeft === -1) timeLeftAssign(duration)
    if (timeLeft === 0) {
      endGame()
      timeLeftAssign(-1)
      return
    }
    const timer = setInterval(() => timeLeftAssign(p => p - 1), 1000)
    return () => clearInterval(timer)
  }, [duration, endGame, isGameStarted, timeLeft])

  return (
    <div className="col-span-4 place-self-center">
      <p>Time Left</p>
      <p
        className={cx(
          'text-center text-xl font-bold',
          timeIndicator == 'warning' && 'text-[--clr-text-warn]',
          timeIndicator == 'danger' && 'text-[--clr-text-danger]'
        )}
      >
        {timeString}
      </p>
    </div>
  )
}
