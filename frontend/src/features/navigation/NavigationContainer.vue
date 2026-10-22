<script lang="ts" setup>
import { NAVIGATION_LINK } from '@/features/navigation/navigation.ts'
import { useRoute } from 'vue-router'
import NavigationItem from './NavigationItem.vue'

const route = useRoute()
</script>

<template>
  <div>
    <h5 class="uppercase font-semibold text-gray-600 text-md">{{ $t('common.workingSpace') }}</h5>
    <ul class="mt-4">
      <NavigationItem
        v-for="navlink in NAVIGATION_LINK"
        v-bind="navlink"
        :key="navlink.url"
        :active-url="route.fullPath"
      />
    </ul>
  </div>
</template>
