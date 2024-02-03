const code = function () {
  let preferredTheme: Theme = 'light'
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  window.__onThemeChange = function () {}

  function setTheme(newTheme: Theme) {
    window.__theme = newTheme
    preferredTheme = newTheme
    document.documentElement.dataset.theme = newTheme
    window.__onThemeChange(newTheme)
  }

  try {
    const fromStorage = localStorage.getItem('theme')
    preferredTheme =
      fromStorage && (fromStorage == 'light' || fromStorage == 'dark')
        ? fromStorage
        : 'light'
  } catch (e) {}

  window.__setPreferredTheme = function (newTheme) {
    setTheme(newTheme)
    try {
      localStorage.setItem('theme', newTheme)
    } catch (e) {}
  }

  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
  darkQuery.addEventListener('change', e =>
    window.__setPreferredTheme(e.matches ? 'dark' : 'light')
  )

  setTheme(preferredTheme ?? (darkQuery.matches ? 'dark' : 'light'))
}

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
export const getTheme = `(${code})();`

export type Theme = 'light' | 'dark'
declare global {
  interface Window {
    __theme: Theme
    __onThemeChange: (theme: Theme) => void
    __setPreferredTheme: (theme: Theme) => void
  }
}
