import Link from 'next/link'

import { env } from '~/env'
import { validateAuth } from '~/lib/auth'

import { PlayPageLink, ProfilePageLink } from './Links'
import LoginOrProfile from './LoginOrProfile'

export default async function Header() {
  if (env.NODE_ENV === 'development') return <Navigation />
  await validateAuth()

  return <Navigation />
}

function Navigation() {
  return (
    <header className="bg-accent p-4">
      <nav
        aria-label="Grepl Game"
        role="menubar"
        className="relative mx-auto max-w-lg"
      >
        <div className="flex items-baseline justify-between">
          <Link href="/" role="menuitem">
            <h1 className="nav__link--logo group relative flex font-amatic text-[2.5rem] font-bold tracking-[0.25rem] text-visible">
              <span className="group-hover:animate-bounce group-hover:ad-0">
                G
              </span>
              <span className="group-hover:animate-bounce group-hover:ad-[0.1s]">
                r
              </span>
              <span className="group-hover:animate-bounce group-hover:ad-[0.2s]">
                e
              </span>
              <span className="group-hover:animate-bounce group-hover:ad-[0.3s]">
                p
              </span>
              <span className="group-hover:animate-bounce group-hover:ad-[0.4s]">
                l
              </span>
            </h1>
          </Link>

          <div className="text-primary flex items-center gap-4">
            <PlayPageLink />
            {env.NODE_ENV === 'production' ? (
              <LoginOrProfile />
            ) : (
              <ProfilePageLink />
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
