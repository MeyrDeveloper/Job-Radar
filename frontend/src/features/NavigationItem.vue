<script setup lang="ts">
import type { NavigationItemType } from '@/features/navigation/navigation'
import { computed, defineProps } from 'vue'

const props = defineProps<
  NavigationItemType & {
    activeUrl: string
  }
>()

const activeUrl = computed(() => props.activeUrl === props.url)
</script>

<template>
  <li class="flex p-4 rounded-r-lg border-l-4 border-transparent" :class="{ active: activeUrl }">
    <component :color="activeUrl ? '#4361EE' : undefined" :is="props.icon" :key="props.url" />
    <p class="ml-4">
      {{ props.label }}
    </p>
  </li>
</template>

<style scoped>
@reference "tailwindcss";

.active {
  @apply bg-blue-200;
  @apply border-indigo-600;
}
</style>
