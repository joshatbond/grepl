import useKeyPress from '../_hooks/useKeyPress'
import gameStore from '../_store/store'
import { tilesToWord } from '../_store/utils'

export default function CurrentWord() {
  const gameStarted = gameStore().gameStarted
  const tiles = gameStore().tiles
  const wasFound = gameStore().alreadyFound
  const wasIncorrect = gameStore().wasIncorrectWord
  const word = gameStore().currentWord
  const { backspace, toggleAlreadyFound, toggleIncorrectWord } = gameStore()

  const updateAnimation = () => {
    setTimeout(() => {
      toggleIncorrectWord(false)
      toggleAlreadyFound(false)
    }, 500)
  }

  useKeyPress('Backspace', backspace)
  useKeyPress('Delete', backspace)

  return (
    <h2
      className={`col-span-4 row-start-1 flex select-none items-center justify-center rounded bg-btn sm:col-span-6 sm:row-start-6 uppercase${
        wasFound || wasIncorrect ? ' text-textWarn' : ''
      }`}
      onAnimationEnd={updateAnimation}
    >
      {!gameStarted
        ? ''
        : wasIncorrect
          ? 'Not a word'
          : wasFound
            ? 'Already found!'
            : tilesToWord(word, tiles)}
    </h2>
  )
}
