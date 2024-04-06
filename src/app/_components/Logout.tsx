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

  return <button onClick={onLogout}>Logout</button>
}
