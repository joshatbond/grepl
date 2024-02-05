import { cx } from 'class-variance-authority'

import * as fonts from '~/fonts'
import { getTheme } from '~/lib/getTheme'
import '~/styles/globals.css'

import Header from './_components/Header'
import Providers from './_components/Providers'

export const metadata = {
  title: 'Grepl',
  description: 'A classic word finding game',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-default text-primary">
      <head>
        <script dangerouslySetInnerHTML={{ __html: getTheme }} />
      </head>
      <Providers>
        <body
          className={cx(
            ...fonts.tailwindFonts.map(font => font.variable),
            fonts.roboto.className,
            'grid grid-rows-[auto,1fr]'
          )}
        >
          <Header />
          {children}
        </body>
      </Providers>
    </html>
  )
}
