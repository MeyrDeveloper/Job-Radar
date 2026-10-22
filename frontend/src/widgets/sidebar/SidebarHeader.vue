<script lang="ts" setup>
import Logo from '@/shared/ui/logo/Logo.vue'
</script>

<template>
  <section class="flex items-center">
    <Logo />

    <div class="ml-4 font-semibold">
      <h2 class="text-2xl">Job Radar</h2>
      <p class="uppercase text-gray-600 text-xs">{{ $t('common.searchJobs') }}</p>
    </div>
  </section>
</template>
