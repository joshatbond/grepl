'use client'

import { usePathname } from 'next/navigation'

import NavItem from './NavItem'

export function PlayPageLink() {
  const pathname = usePathname()

  if (pathname === '/play') return null
  return (
    pathname !== '/play' && (
      <NavItem
        to="/play"
        className="rounded-lg bg-activate px-4 py-1 text-neutral-100"
      >
        Play
      </NavItem>
    )
  )
}

export function ProfilePageLink() {
  const pathname = usePathname()

  if (pathname === '/profile') return null
  return pathname !== '/profile' && <NavItem to="/profile">Profile</NavItem>
}
