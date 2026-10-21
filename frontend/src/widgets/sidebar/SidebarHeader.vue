<script lang="ts" setup>
import Logo from '@/shared/ui/logo/Logo.vue'
</script>

<template>
  <section>
    <Logo />

    <div>
      <h2>Job Radar</h2>
      <p>{{ $t('common.searchVacancies') }}</p>
    </div>
  </section>
</template>
