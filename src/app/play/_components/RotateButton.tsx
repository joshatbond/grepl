import useKeyPress from '../_hooks/useKeyPress'
import gameStore from '../_store/store'
import Button from './Button'

export default function RotateButton({ dir }: { dir: 'cw' | 'ccw' }) {
  const rotate = gameStore().rotateTiles
  const isPressed = useKeyPress(dir === 'cw' ? 'ArrowRight' : 'ArrowLeft', () =>
    rotate(dir)
  )

  return (
    <Button
      cn={`row-start-7 ${
        dir === 'cw'
          ? 'col-start-2 sm:row-start-2 sm:col-start-1'
          : 'col-start-3 sm:row-start-4 sm:col-start-1'
      } cursor-pointer bg-btn text-visible sm:row-span-2`}
      name={`rotate-${dir === 'cw' ? '' : 'counter-'}clockwise`}
      onClick={() => rotate(dir)}
      pressed={isPressed}
    >
      {dir === 'cw' ? <RotateCWIcon /> : <RotateCCWIcon />}
    </Button>
  )
}

const RotateCWIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3"
    />
  </svg>
)
const RotateCCWIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
    />
  </svg>
)
