import { onMounted, ref } from 'vue'

const ThemeValues = {
  light: 'light',
  dark: 'dark',
} as const

export type ThemeValuesType = (typeof ThemeValues)[keyof typeof ThemeValues]

const SystemThemeValues = {
  ...ThemeValues,
  system: 'system',
} as const
export type SystemThemeValuesType = (typeof SystemThemeValues)[keyof typeof SystemThemeValues]

const setTheme = (value: SystemThemeValuesType) => {
  localStorage.setItem('theme', value)

  console.log(value)

  if (value === SystemThemeValues.system) {
    document.documentElement.removeAttribute('data-theme')
  } else {
    document.documentElement.setAttribute('data-theme', value)
  }
}

export const useTheme = () => {
  const theme = ref(localStorage.getItem('theme') || 'system')

  const toggleTheme = () => {
    const isDark =
      document.documentElement.getAttribute('data-theme') === 'dark' ||
      (!document.documentElement.hasAttribute('data-theme') &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)

    setTheme(isDark ? ThemeValues.light : ThemeValues.dark)
  }

  onMounted(() => {
    setTheme((theme.value as SystemThemeValuesType) ?? SystemThemeValues.system)
  })

  return { theme, setTheme, toggleTheme }
}
