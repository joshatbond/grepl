import { type RefObject, useEffect, useRef } from 'react'

import gameStore from '../_store/store'

export function useIntersecting<T extends HTMLElement>(ref: RefObject<T>) {
  const { x: px, y: py } = gameStore().pointer
  const r = useRef<DOMRect | null>(null)

  useEffect(() => {
    if (ref.current) {
      r.current = ref.current.getBoundingClientRect()
    }
  }, [ref])

  if (!r.current || !px || !py) return false
  const { x: rx, y: ry, width: rw, height: rh } = r.current

  return px >= rx && px <= rx + rw && py >= ry && py <= ry + rh
}
