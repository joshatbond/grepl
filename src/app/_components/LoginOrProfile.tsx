'use client'

import { CorbadoAuth, useCorbado } from '@corbado/react'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import NavItem from './NavItem'

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

export default function LoginOrProfile() {
  const pathname = usePathname()
  const { isAuthenticated, loading } = useCorbado()
  const [showAuth, showAuthAssign] = useState(false)

  useEffect(() => {
    showAuthAssign(false)
  }, [pathname])

  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <>
      {isAuthenticated ? (
        <NavItem to="/profile">Profile</NavItem>
      ) : (
        <div className="relative">
          <button onClick={() => showAuthAssign(true)}>Login</button>
          {showAuth && (
            <div className="absolute right-0">
              <Login />

              <button
                className="absolute right-4 top-4 rounded px-3 py-1 text-black hover:bg-neutral-400 hover:text-neutral-50"
                onClick={() => showAuthAssign(false)}
              >
                X
              </button>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export function Login() {
  const router = useRouter()
  const onLoggedIn = () => router.push('/profile')

  return <CorbadoAuth onLoggedIn={onLoggedIn} />
}
