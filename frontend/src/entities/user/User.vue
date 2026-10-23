<script lang="ts" setup>
import { SystemThemeValues, ThemeValues, useThemeStore } from '@/app/providers/stores/theme'
import Switch from '@/shared/ui/components/Switch.vue'
import { computed, inject, type ComputedRef } from 'vue'
import { useI18n } from 'vue-i18n'
import type { User } from './model/types'

const themeStore = useThemeStore()
const i18n = useI18n()

const theme = computed({
  get() {
    if (themeStore.currentTheme === SystemThemeValues.system) {
      return !window.matchMedia('(prefers-color-scheme: dark)').matches
    }

    return themeStore.currentTheme === SystemThemeValues.light
  },
  set(value) {
    themeStore.setTheme(value ? ThemeValues.light : ThemeValues.dark)
  },
})

const user = inject<ComputedRef<User>>('user')
const letters = computed(() => {
  const [firstName, lastName] = `${user?.value?.firstName} ${user?.value?.lastName}`
    .split(' ')
    .map((elem) => elem?.[0]?.toUpperCase())

  return { firstName, lastName }
})

const themeText = computed(
  () =>
    `${i18n.t('common.turnOn')} ${theme.value ? i18n.t('common.darkTheme', 2) : i18n.t('common.lightTheme', 2)}`,
)
</script>

<template>
  <section class="pt-5 border-t-2 border-[var(--border)]">
    <h6 class="uppercase font-semibold text-gray-600 text-md">{{ $t('common.yourAccount') }}</h6>
    <div class="flex items-center mt-5">
      <p class="rounded-xl bg-blue-100 text-l text-blue-800 font-extrabold p-3">
        {{ letters.firstName }}{{ letters.lastName }}
      </p>
      <div class="ml-4 font-semibold">
        <p>{{ $t('common.myProfile') }}</p>
      </div>
    </div>
    <div class="mt-5">
      <Switch v-model="theme">{{ themeText }}</Switch>
    </div>
  </section>
</template>
