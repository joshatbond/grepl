'use client'

import { useCallback, useEffect, useState } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { type Theme } from '~/lib/getTheme'

const themes = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
] satisfies { label: string; value: Theme }[]

export default function ThemeSelect() {
  const [theme, setTheme] = useState<Theme>(global.window?.__theme ?? 'light')

  const updateTheme = useCallback((s: string) => {
    if (themes.map(theme => theme.value).includes(s)) {
      global.window?.__setPreferredTheme(s as Theme)
    }
  }, [])

  useEffect(() => {
    global.window.__onThemeChange = setTheme
  }, [])

  return (
    <Select value={theme} onValueChange={updateTheme}>
      <SelectTrigger className="w-[100px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>

      <SelectContent>
        {themes.map(({ label, value }, i) => (
          <SelectItem value={value} key={i}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
