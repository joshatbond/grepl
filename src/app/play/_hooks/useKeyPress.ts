import { useEffect, useState } from 'react'

export default function useKeyPress(targetKey: string, cb?: () => void) {
  const [keyPressed, keyPressedAssign] = useState(false)

  useEffect(() => {
    const downHandler = (e: KeyboardEvent) => {
      if (e.key === targetKey) {
        keyPressedAssign(true)
        if (cb != null) cb()
      }
    }
    const upHandler = (e: KeyboardEvent) => {
      if (e.key === targetKey) keyPressedAssign(false)
    }

    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)

    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, [cb, targetKey])

  return keyPressed
}
