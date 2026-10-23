<script lang="ts" setup>
import { useThemeStore } from '@/app/providers/stores/theme'
import { computed, inject, type ComputedRef } from 'vue'
import type { User } from './model/types'

const themeStore = useThemeStore()

const user = inject<ComputedRef<User>>('user')
const letters = computed(() => {
  const [firstName, lastName] = `${user?.value?.firstName} ${user?.value?.lastName}`
    .split(' ')
    .map((elem) => elem?.[0]?.toUpperCase())

  return { firstName, lastName }
})
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
      <label>
        <input type="checkbox" v-on:change="() => themeStore.toggleTheme()" />
        Status: {{ themeStore.currentTheme }}
      </label>
    </div>
  </section>
</template>
