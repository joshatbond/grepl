import useKeyPress from '../_hooks/useKeyPress'
import gameStore from '../_store/store'
import Button from './Button'

export default function ClearButton() {
  const clearWord = gameStore().clearWord
  const isPressed = useKeyPress('Escape', clearWord)

  return (
    <Button
      name="clear word"
      cn="row-start-7 col-start-1 cursor-pointer bg-clear text-visible sm:row-span-2 sm:row-start-2 sm:col-start-6"
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
