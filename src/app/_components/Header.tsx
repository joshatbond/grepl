import { eq } from 'drizzle-orm'
import dynamic from 'next/dynamic'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { env } from '~/env'
import getNodeSDK from '~/lib/getNodeSdk'
import { db } from '~/server/db'
import { users } from '~/server/db/schema/users'

import LoginOrProfile from './LoginOrProfile'
import NavItem from './NavItem'

const Theme = dynamic(() => import('./Theme'), {
  ssr: false,
  loading: () => <div className="h-6 w-6" />,
})

export default async function Header() {
  if (env.NODE_ENV === 'development') return <Navigation />

  const cookieStore = cookies()
  const session = cookieStore.get('cbo_short_session')
  // if (!session) return redirect('/#login-init')
  if (session) {
    const sdk = getNodeSDK()

    try {
      const corbado_id = (
        await sdk.sessions().getCurrentUser(session.value)
      ).getID()
      const db_user = await db
        .select()
        .from(users)
        .where(eq(users.corbadoId, corbado_id))
        .get()

      if (!db_user) {
        await db.insert(users).values({ corbadoId: corbado_id })
      }
    } catch (e) {}
  }

  return <Navigation />
}

function Navigation() {
  return (
    <header>
      <nav
        aria-label="Grepl Game"
        role="menubar"
        className="relative flex items-baseline justify-between bg-accent px-4 py-4"
      >
        <Link href="/" role="menuitem">
          <h1 className="nav__link--logo group relative flex font-amatic text-[2.5rem] font-bold tracking-[0.25rem] text-visible">
            <span className="group-hover:ad-0 group-hover:animate-bounce">
              G
            </span>
            <span className="group-hover:ad-[0.1s] group-hover:animate-bounce">
              r
            </span>
            <span className="group-hover:ad-[0.2s] group-hover:animate-bounce">
              e
            </span>
            <span className="group-hover:ad-[0.3s] group-hover:animate-bounce">
              p
            </span>
            <span className="group-hover:ad-[0.4s] group-hover:animate-bounce">
              l
            </span>
          </h1>
        </Link>

        <div className="text-primary flex items-center gap-4">
          <NavItem
            to="/play"
            className="rounded-lg bg-activate px-4 py-1 text-neutral-100"
          >
            Play
          </NavItem>
          {env.NODE_ENV === 'production' ? (
            <LoginOrProfile />
          ) : (
            <NavItem to="/profile">Profile</NavItem>
          )}

          <Theme />
        </div>
      </nav>
    </header>
  )
}
