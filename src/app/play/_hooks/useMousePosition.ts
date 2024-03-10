import { useCallback, useEffect, useState } from 'react'

export function useMousePosition(cb: (e: PointerEvent) => void, delay: number) {
  const [pressed, pressedAssign] = useState(false)
  const debounceHandler = useCallback(
    (e: PointerEvent) => {
      if (pressed) debounce(cb(e), delay)
    },
    [cb, delay, pressed]
  )

  useEffect(() => {
    const downHandler = (e: PointerEvent) => {
      pressedAssign(true)
      cb(e)
    }
    const upHandler = (e: PointerEvent) => {
      pressedAssign(false)
      cb(e)
    }

    window.addEventListener('pointermove', debounceHandler)
    window.addEventListener('pointerdown', downHandler)
    window.addEventListener('pointerup', upHandler)

    return () => {
      window.removeEventListener('pointermove', debounceHandler)
      window.removeEventListener('pointerdown', downHandler)
      window.removeEventListener('pointerup', upHandler)
    }
  }, [cb, debounceHandler])
}

function debounce(cb: unknown, delay: number) {
  let timeout: NodeJS.Timeout
  return (...args: unknown[]) => {
    clearTimeout(timeout)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    timeout = setTimeout(() => typeof cb === 'function' && cb(...args), delay)
  }
}
