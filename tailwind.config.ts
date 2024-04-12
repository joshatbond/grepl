import { type Config } from 'tailwindcss'
import tailwindAnimate from 'tailwindcss-animate'
import { fontFamily } from 'tailwindcss/defaultTheme'

import animationDelayPlugin from './src/styles/tailwind/animationDelay'
import themePlugin from './src/styles/tailwind/themePlugin'

const config = {
  content: ['./src/**/*.tsx'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        bounce: 'bounce 1s ease',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        wave: 'wave 3s ease-in-out infinite',
        wiggle: 'wiggle 200ms ease-in-out',
      },
      backgroundColor: {
        btnGradient:
          'linear-gradient(-45deg, hsl(0, 0%, 0%), hsl(0, 0%, 100%))',
      },
      boxShadow: {
        active:
          'inset 2px 2px 3px 0 hsla(0, 0%, 0%, 0.2), inset -2px -2px 3px 0 hsla(0, 0%, 100%, 0.5)',
      },
      fontFamily: {
        amatic: ['var(--font-amatic)', ...fontFamily.sans],
        roboto: ['var(--font-roboto)', ...fontFamily.sans],
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        bounce: {
          '0%, 65%': { transform: 'scale(1, 1) translateY(0)' },
          '10%': { transform: 'scale(1.1, 0.9) translateY(0)' },
          '30%': { transform: 'scale(0.9, 1.1) translateY(-20px)' },
          '50%': { transform: 'scale(1.05, 0.95) translateY(0)' },
          '58%': { transform: 'scale(1, 1) translateY(-7px)' },
        },
        pulse: {
          '50%': { opacity: '0.5' },
        },
        wave: {
          '50%': { transform: 'translateZ(calc(1.5 * var(--cube-size))' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(5deg)' },
        },
      },
    },
  },
  plugins: [animationDelayPlugin, themePlugin, tailwindAnimate],
} satisfies Config

export default config
