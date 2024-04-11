import { createThemes } from 'tw-colors'

import { colors } from './colors'

const themePlugin = createThemes({
  dark: themeFactory({
    material: colors.primary[900],
    accent: colors.primary[700],
    visible: colors.neutral[100],
    inverted: colors.neutral[900],

    boardFront: 'hsl(205, 67%, 30%)',
    boardSide: 'hsl(205, 67%, 40%)',
    boardTop: 'hsl(205, 67%, 47%)',
    front: 'hsl(0, 5%, 50%)',
    frontActive: 'hsl(121, 39%, 47%)',
    side: 'hsl(0, 5%, 70%)',
    sideActive: 'hsl(145, 39%, 40%)',
    top: 'hsl(0, 5%, 84%)',
    topActive: 'hsl(145, 39%, 28%)',

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
    to: colors.primary[900],
    toAdj: colors.slate[800],
    toSelected: colors.primary[600],
  }),
  light: themeFactory({
    material: colors.primary[300],
    accent: colors.primary[400],
    visible: colors.neutral[900],
    inverted: colors.neutral[100],

    boardFront: 'hsl(205, 67%, 30%)',
    boardSide: 'hsl(205, 67%, 40%)',
    boardTop: 'hsl(205, 67%, 47%)',
    front: 'hsl(0, 5%, 50%)',
    frontActive: 'hsl(121, 39%, 47%)',
    side: 'hsl(0, 5%, 70%)',
    sideActive: 'hsl(145, 39%, 40%)',
    top: 'hsl(0, 5%, 84%)',
    topActive: 'hsl(145, 39%, 28%)',

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
    to: colors.primary[300],
    toAdj: colors.slate[400],
    toSelected: colors.primary[400],
  }),
})

export default themePlugin

type ThemeKeys =
  | 'material'
  | 'accent'
  | 'visible'
  | 'inverted'
  | 'boardFront'
  | 'boardSide'
  | 'boardTop'
  | 'front'
  | 'frontActive'
  | 'side'
  | 'sideActive'
  | 'top'
  | 'topActive'
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
  | 'to'
  | 'toAdj'
  | 'toSelected'

function themeFactory(config: Record<ThemeKeys, string>) {
  return config
}
