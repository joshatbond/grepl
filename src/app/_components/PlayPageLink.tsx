'use client'

import { usePathname } from 'next/navigation'

import NavItem from './NavItem'

export default function PlayPageLink() {
  const pathname = usePathname()

  if (pathname === '/play') return null
  return pathname !== '/play' ? (
    <NavItem
      to="/play"
      className="rounded-lg bg-activate px-4 py-1 text-neutral-100"
    >
      Play
    </NavItem>
  ) : null
}
