import plugin from 'tailwindcss/plugin'

const animationDelayPlugin = plugin(({ matchUtilities, theme }) =>
  matchUtilities(
    {
      ad: (value: string) => ({ 'animation-delay': value }),
    },
    { values: theme('transitionDelay') }
  )
)

export default animationDelayPlugin
