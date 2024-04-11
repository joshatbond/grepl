import { cx } from 'class-variance-authority'

import * as fonts from '~/fonts'
import { getTheme } from '~/lib/getTheme'
import '~/styles/globals.css'

import Header from './_components/Header'
import CorbadoProvider from './_providers/CorbadoProvider'
import QueryClientWrapper from './_providers/QueryClientProvider'

export const metadata = {
  title: 'Grepl',
  description: 'A classic word finding game',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" className="bg-material text-visible">
      <head>
        <script dangerouslySetInnerHTML={{ __html: getTheme }} />
      </head>
      <QueryClientWrapper>
        <CorbadoProvider>
          <body
            className={cx(
              ...fonts.tailwindFonts.map(font => font.variable),
              fonts.roboto.className,
              ''
            )}
          >
            <Header />
            {children}
          </body>
        </CorbadoProvider>
      </QueryClientWrapper>
    </html>
  )
}
