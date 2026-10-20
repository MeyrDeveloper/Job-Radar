<script lang="ts" setup>
import { NAVIGATION_LINK } from '@/features/navigation'
</script>

<template>
  <div>
    <ul>
      <li v-for="value in NAVIGATION_LINK" :key="value.url">{{ value.label }}</li>
    </ul>
  </div>
</template>
