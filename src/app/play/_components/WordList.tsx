'use client'

import { cx } from 'class-variance-authority'

import gameStore from '../_store/store'

export default function WordList() {
  const wordList = gameStore().wordList

  return (
    <div className="h-40 select-none px-4">
      <h3 className="border-b border-b-[--clr-neutral-100] text-center text-xl leading-7">
        Words found
      </h3>

      <div className="flex h-full w-full flex-col flex-wrap overflow-x-auto px-2 pt-2">
        {wordList.map((word, i) => (
          <p
            key={word}
            className={cx([
              'w-fit px-4 py-1',
              i === 0 && 'rounded bg-[--clr-primary-500]',
            ])}
          >
            {word}
          </p>
        ))}
      </div>
    </div>
  )
}
