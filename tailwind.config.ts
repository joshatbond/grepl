import { type Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

import animationDelayPlugin from './src/styles/tailwind/animationDelay'
import themePlugin from './src/styles/tailwind/themePlugin'

export default {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      animation: {
        bounce: 'bounce 1s ease',
        wave: 'wave 3s ease-in-out infinite',
        wiggle: 'wiggle 200ms ease-in-out',
      },
      fontFamily: {
        amatic: ['var(--font-amatic)', ...fontFamily.sans],
        roboto: ['var(--font-roboto)', ...fontFamily.sans],
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      keyframes: {
        bounce: {
          '0%, 65%': { transform: 'scale(1, 1) translateY(0)' },
          '10%': { transform: 'scale(1.1, 0.9) translateY(0)' },
          '30%': { transform: 'scale(0.9, 1.1) translateY(-20px)' },
          '50%': { transform: 'scale(1.05, 0.95) translateY(0)' },
          '58%': { transform: 'scale(1, 1) translateY(-7px)' },
        },
        wave: {
          '50%': { transform: 'translateZ(calc(1.5 * var(--cube-size))' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(5deg)' },
        },
      },
      rotate: {
        '10': '10deg',
        '30': '30deg',
      },
    },
  },
  plugins: [animationDelayPlugin, themePlugin],
} satisfies Config
