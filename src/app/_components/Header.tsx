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
  if (env.NODE_ENV === 'development') {
    return (
      <header>
        <nav
          aria-label="Grepl Game"
          role="menubar"
          className="relative flex items-baseline justify-between bg-accent px-4 py-4"
        >
          <Link href="/" role="menuitem">
            <h1 className="nav__link--logo relative flex font-amatic text-[2.5rem] font-bold tracking-[0.25rem] text-primary">
              <span className="nav__link--g">G</span>
              <span className="nav__link--r">r</span>
              <span className="nav__link--e">e</span>
              <span className="nav__link--p">p</span>
              <span className="nav__link--l">l</span>
            </h1>
          </Link>

          <div className="flex items-center gap-4 text-primary">
            <NavItem
              to="/play"
              className="rounded-lg bg-primary-500 px-4 py-1 text-neutral-100"
            >
              Play
            </NavItem>
            <NavItem to="/profile">Profile</NavItem>

            <Theme />
          </div>
        </nav>
      </header>
    )
  }

  const cookieStore = cookies()
  const session = cookieStore.get('cbo_short_session')
  if (!session) return redirect('/#login-init')

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

  return (
    <header>
      <nav
        aria-label="Grepl Game"
        role="menubar"
        className="relative flex items-baseline justify-between bg-accent px-4 py-4"
      >
        <Link href="/" role="menuitem">
          <h1 className="nav__link--logo relative flex font-amatic text-[2.5rem] font-bold tracking-[0.25rem] text-primary">
            <span className="nav__link--g">G</span>
            <span className="nav__link--r">r</span>
            <span className="nav__link--e">e</span>
            <span className="nav__link--p">p</span>
            <span className="nav__link--l">l</span>
          </h1>
        </Link>

        <div className="flex items-center gap-4 text-primary">
          <NavItem
            to="/play"
            className="rounded-lg bg-primary-500 px-4 py-1 text-neutral-100"
          >
            Play
          </NavItem>
          <LoginOrProfile />

          <Theme />
        </div>
      </nav>
    </header>
  )
}
