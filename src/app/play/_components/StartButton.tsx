'use client'

import { useSearchParams } from 'next/navigation'
import { useRef } from 'react'

import gameStore from '../_store/store'
import Button from './Button'

export default function StartButton() {
  const searchParams = useSearchParams()
  const ref = useRef<HTMLButtonElement>(null)
  const isGameStarted = gameStore().gameStarted

  const { startGame, endGame } = gameStore()

  const handleClick = () => {
    const query = searchParams.get('game') ?? ''
    ref.current?.blur()

    if (isGameStarted) {
      endGame()
    } else {
      startGame(query)
    }
  }
  return (
    <Button
      cn={`bg-activate text-textActivate${
        isGameStarted ? '' : ' animate-pulse'
      }`}
      onClick={handleClick}
      ref={ref}
      tabIndex={0}
    >
      {isGameStarted ? 'End' : 'Start'}
    </Button>
  )
}
