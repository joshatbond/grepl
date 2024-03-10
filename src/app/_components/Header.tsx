import { cx } from 'class-variance-authority'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { type ReactNode } from 'react'

const Theme = dynamic(() => import('./Theme'), {
  ssr: false,
  loading: () => <div className="w-6 h-6" />,
})

export default function Header() {
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

function NavItem({
  children,
  className,
  to,
}: {
  children: ReactNode
  className?: string
  to: string
}) {
  return (
    <div
      className={cx(
        'active:animate-wiggle hover:animate-wiggle focus:animate-wiggle',
        className
      )}
    >
      <Link href={to} role="menuitem">
        {children}
      </Link>
    </div>
  )
}