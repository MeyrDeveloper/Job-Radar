<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()
const currentDate = computed(() => {
  const dateString = new Date().toLocaleDateString(i18n.locale.value ?? 'en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return `${dateString[0]?.toUpperCase()}${dateString.slice(1)}`
})
</script>
<template>
  <header class="border-b-2 border-[var(--border)] p-6">
    <p>
      {{ currentDate }}
    </p>
    <p class="font-semibold text-lg">
      {{ $t('common.findOpportunity') }}
    </p>
  </header>
</template>
