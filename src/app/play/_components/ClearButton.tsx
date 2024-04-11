import { cx } from 'class-variance-authority'

import useKeyPress from '../_hooks/useKeyPress'
import gameStore from '../_store/store'
import Button from './Button'
import styles from './play.module.css'

export default function ClearButton() {
  const clearWord = gameStore().clearWord
  const isPressed = useKeyPress('Escape', clearWord)

  return (
    <Button
      name="clear word"
      cn="row-span-2 cursor-pointer bg-clear text-visible"
      onClick={clearWord}
      pressed={isPressed}
    >
      <ClearIcon />
    </Button>
  )
}

const ClearIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
)
