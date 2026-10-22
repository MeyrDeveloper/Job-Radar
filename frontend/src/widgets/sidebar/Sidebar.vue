<script setup lang="ts">
import User from '@/entities/user/User.vue'
import NavigationContainer from '@/features/NavigationContainer.vue'
import SidebarHeader from './SidebarHeader.vue'
</script>
<template>
  <aside class="w-72 flex-shrink-0 h-screen sticky top-0 border-r-2 p-4 border-[var(--border)]">
    <SidebarHeader />

    <NavigationContainer class="mt-12" />

    <User class="mt-8" />
  </aside>
</template>
