'use client'

import { CorbadoProvider } from '@corbado/react'
import { useLocalStorage } from 'react-use'

import { env } from '~/env'

import { type Theme } from '../_components/useTheme'

export default function Provider({ children }: React.PropsWithChildren) {
  const [theme] = useLocalStorage<Theme>('theme')

  return (
    <CorbadoProvider
      projectId={env.NEXT_PUBLIC_CORBADO_PROJECT_ID}
      darkMode={theme && theme === 'dark' ? 'on' : 'off'}
      setShortSessionCookie={true}
    >
      {children}
    </CorbadoProvider>
  )
}
