'use client'

import { CorbadoAuth, useCorbado } from '@corbado/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import NavItem from './NavItem'

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

export default function LoginOrProfile() {
  const { isAuthenticated, loading } = useCorbado()
  const [showAuth, showAuthAssign] = useState(false)

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
                className="absolute right-4 top-4 rounded px-3 py-1 hover:bg-neutral-400"
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
