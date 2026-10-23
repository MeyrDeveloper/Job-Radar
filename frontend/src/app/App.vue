<script setup lang="ts">
import { onMounted } from 'vue'
import { useThemeStore } from './providers/stores/theme'

const themeStore = useThemeStore()

onMounted(() => {
  themeStore.initTheme()
})
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
