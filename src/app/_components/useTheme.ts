import { useCallback, useEffect, useState } from 'react'

const LOCAL_STORAGE_KEY = 'theme'
export default function useTheme() {
  const [theme, themeAssign] = useState<Theme>('light')

  useEffect(() => {
    const mode = getInitialColorMode()
    themeAssign(mode)
    document.documentElement.setAttribute('data-theme', mode)

    function getInitialColorMode(): Theme {
      const persistedColorPreference =
        window.localStorage.getItem(LOCAL_STORAGE_KEY)
      const hasPersistedPreference =
        typeof persistedColorPreference === 'string' &&
        (persistedColorPreference === 'light' ||
          persistedColorPreference === 'dark')
      if (hasPersistedPreference) return persistedColorPreference

      const mql = window.matchMedia('(prefers-color-scheme: dark)')
      const hasMediaQueryPreference = typeof mql.matches === 'boolean'
      if (hasMediaQueryPreference) return mql.matches ? 'dark' : 'light'

      return 'light'
    }
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const updateTheme = useCallback(
    (newTheme?: Theme) => {
      const t: Theme = newTheme ?? theme === 'light' ? 'dark' : 'light'
      themeAssign(t)
      window.localStorage.setItem(LOCAL_STORAGE_KEY, t)
    },
    [theme]
  )

  return [theme, updateTheme] as const
}

export type Theme = 'light' | 'dark'
