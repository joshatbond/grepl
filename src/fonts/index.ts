import { type NextFontWithVariable } from 'next/dist/compiled/@next/font'
import { Amatic_SC, Roboto } from 'next/font/google'

export const roboto = Roboto({
  weight: ['100', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
})
export const amatic = Amatic_SC({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-amatic',
})

export const tailwindFonts: NextFontWithVariable[] = [
  amatic,
  roboto,
  // ...
]
