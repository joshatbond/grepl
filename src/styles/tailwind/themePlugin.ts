import { createThemes } from 'tw-colors'

import { colors } from './colors'

const themePlugin = createThemes({
  dark: themeFactory({
    material: colors.primary[900],
    accent: colors.primary[700],
    visible: colors.neutral[100],
    inverted: colors.neutral[900],

    activate: colors.primary[500],
    adjLine: colors.green[400],
    btn: colors.neutral[600],
    clear: colors.error[700],
    from: colors.primary[700],
    fromAdj: colors.slate[600],
    fromSelected: colors.primary[400],
    textActivate: colors.neutral[100],
    textDanger: colors.error[400],
    textWarn: colors.warn[400],
    tile: colors.primary[800],
    tileAdj: colors.slate[600],
    tileSelected: colors.primary[500],
    tileOnAdj: colors.slate[600],
    tileOnSelected: colors.primary[400],
    to: colors.primary[900],
    toAdj: colors.slate[800],
    toSelected: colors.primary[600],

    selectBg: colors.neutral[900],
    selectBorder: colors.neutral[800],
    selectFocus: colors.primary[700],
    selectPlaceholder: colors.neutral[400],
  }),
  light: themeFactory({
    material: colors.primary[300],
    accent: colors.primary[400],
    visible: colors.neutral[900],
    inverted: colors.neutral[100],

    activate: colors.primary[500],
    adjLine: colors.green[600],
    btn: colors.primary[200],
    clear: colors.error[400],
    from: colors.primary[100],
    fromAdj: colors.slate[200],
    fromSelected: colors.primary[200],
    textActivate: colors.neutral[100],
    textDanger: colors.error[500],
    textWarn: colors.warn[600],
    tile: colors.primary[200],
    tileAdj: colors.slate[300],
    tileSelected: colors.primary[300],
    tileOnAdj: colors.slate[400],
    tileOnSelected: colors.primary[400],
    to: colors.primary[300],
    toAdj: colors.slate[400],
    toSelected: colors.primary[400],

    selectBg: colors.white,
    selectBorder: colors.neutral[200],
    selectFocus: colors.primary[300],
    selectPlaceholder: colors.neutral[500],
  }),
})

export default themePlugin

type ThemeKeys =
  | 'material'
  | 'accent'
  | 'visible'
  | 'inverted'
  | 'activate'
  | 'adjLine'
  | 'btn'
  | 'clear'
  | 'from'
  | 'fromAdj'
  | 'fromSelected'
  | 'textActivate'
  | 'textDanger'
  | 'textWarn'
  | 'tile'
  | 'tileAdj'
  | 'tileSelected'
  | 'tileOnAdj'
  | 'tileOnSelected'
  | 'to'
  | 'toAdj'
  | 'toSelected'
  | 'selectBg'
  | 'selectBorder'
  | 'selectFocus'
  | 'selectPlaceholder'

function themeFactory(config: Record<ThemeKeys, string>) {
  return config
}
