/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-unsafe-call */

/* eslint-disable @typescript-eslint/no-unsafe-return */
// Found [here](https://github.com/pmndrs/zustand/discussions/2195)
// to create reusable store with middleware built in and fully type safe.
import { type StateCreator, create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export default function createStore<T extends object, U extends object>(
  name: string,
  state: T,
  actions: StateCreator<
    T,
    [['zustand/devtools', never], ['zustand/immer', never]],
    [['zustand/immer', never], ['zustand/devtools', never]],
    U
  >
) {
  return create<T & U>()(
    devtools(
      immer((...a) => Object.assign({}, state, (actions as any)(...a))),
      { name }
    )
  )
}
