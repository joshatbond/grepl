import { cx } from 'class-variance-authority'

import useKeyPress from '../_hooks/useKeyPress'
import gameStore from '../_store/store'
import { tilesToWord } from '../_store/utils'
import styles from './play.module.css'

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
      className={cx([
        'col-span-6 flex select-none items-center justify-center rounded bg-[--clr-btn] uppercase',
        styles.word,
      ])}
      onAnimationEnd={updateAnimation}
      data-warn={wasFound || wasIncorrect}
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