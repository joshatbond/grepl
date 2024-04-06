import { cx } from 'class-variance-authority'
import Link from 'next/link'

export default function NavItem({ children, className, disabled, to }: Props) {
  return (
    <div
      className={cx(
        disabled
          ? ''
          : 'hover:animate-wiggle focus:animate-wiggle active:animate-wiggle',
        className
      )}
    >
      {disabled ? (
        <div>{children}</div>
      ) : (
        <Link href={to!} role="menuitem">
          {children}
        </Link>
      )}
    </div>
  )
}

type Props = React.PropsWithChildren & {
  className?: string
  disabled?: boolean
  to?: string
}
