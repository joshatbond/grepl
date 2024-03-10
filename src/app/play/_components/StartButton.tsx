'use client'

import { cx } from 'class-variance-authority'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useRef } from 'react'

import gameStore from '../_store/store'
import styles from './play.module.css'

export default function StartButton() {
  const router = useRouter()
  const pathname = usePathname()
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
      router.replace(pathname)
    }
  }
  return (
    <button
      tabIndex={0}
      className={cx([styles.btn, styles['btn--play']])}
      onClick={handleClick}
      ref={ref}
      data-game-running={isGameStarted}
    >
      {isGameStarted ? 'End' : 'Start'}
    </button>
  )
}
