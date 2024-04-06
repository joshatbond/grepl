'use client'

import { CorbadoAuth, useCorbado } from '@corbado/react'
import { useRouter } from 'next/navigation'

import NavItem from './NavItem'

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

export default function LoginOrProfile() {
  const { isAuthenticated, loading } = useCorbado()

  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <>
      {isAuthenticated ? (
        <NavItem to="/profile">Profile</NavItem>
      ) : (
        <NavItem>
          <Login />
        </NavItem>
      )}
    </>
  )
}

export function Login() {
  const router = useRouter()
  const onLoggedIn = () => router.push('/profile')

  return <CorbadoAuth onLoggedIn={onLoggedIn} />
}
