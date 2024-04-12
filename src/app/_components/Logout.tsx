'use client'

import { useCorbado } from '@corbado/react'
import { useRouter } from 'next/navigation'

export default function Logout() {
  const { logout } = useCorbado()
  const router = useRouter()

  const onLogout = async () => {
    await logout()
    router.push('/')
  }

  return (
    <button onClick={onLogout} className="rounded bg-red-600 px-3 py-1 text-sm">
      Logout
    </button>
  )
}
