import { cx } from 'class-variance-authority'
import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> &
  Partial<{
    children: ReactNode
    cn: string
    pressed: boolean
  }>

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ children, cn, pressed, ...props }, ref) => (
    <button
      className={cx(
        'hover:shadow-active focus:shadow-active active:shadow-active grid place-content-center rounded border-none outline-none',
        pressed
          ? 'shadow-active'
          : 'shadow-[3px_3px_4px_0_hsla(0,0%,0%,0.25),-2px_-2px_3px_0_hsla(0,0%,100%,0.3)]',
        cn
      )}
      ref={ref}
      type="button"
      {...props}
    >
      {children}
    </button>
  )
)

Button.displayName = 'Button'

export default Button
