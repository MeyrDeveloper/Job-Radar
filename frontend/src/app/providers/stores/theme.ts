import { defineStore } from 'pinia'
import { ref } from 'vue'

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

export const useThemeStore = defineStore('theme', () => {
  const currentTheme = ref<string>(
    (localStorage.getItem('theme') || SystemThemeValues.system) as SystemThemeValuesType,
  )

  const applyThemeToDom = (value: SystemThemeValuesType) => {
    if (value === SystemThemeValues.system) {
      document.documentElement.removeAttribute('data-theme')
    } else {
      document.documentElement.setAttribute('data-theme', value)
    }
  }

  const setTheme = (value: SystemThemeValuesType) => {
    currentTheme.value = value

    localStorage.setItem('theme', value)

    applyThemeToDom(value)
  }

  const toggleTheme = () => {
    const activeTheme = document.documentElement.getAttribute('data-theme')

    const nextTheme =
      activeTheme === SystemThemeValues.dark ? SystemThemeValues.light : SystemThemeValues.dark

    setTheme(nextTheme)
  }

  const initTheme = () => {
    applyThemeToDom(currentTheme.value as SystemThemeValuesType)

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (currentTheme.value === SystemThemeValues.system) {
        applyThemeToDom(SystemThemeValues.dark)
      }
    })
  }

  return {
    currentTheme,
    applyThemeToDom,
    setTheme,
    toggleTheme,
    initTheme,
  }
})
