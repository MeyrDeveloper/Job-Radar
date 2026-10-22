<script lang="ts" setup>
const [firstName, lastName] = 'meir nurali'.split(' ').map((elem) => elem?.[0]?.toUpperCase())
</script>

<template>
  <section class="pt-5 border-t-2 border-[var(--border)]">
    <h6 class="uppercase font-semibold text-gray-600 text-md">{{ $t('common.yourAccount') }}</h6>
    <div class="flex items-center mt-5">
      <p class="rounded-xl bg-blue-100 text-l text-blue-800 font-extrabold p-3">
        {{ firstName }}{{ lastName }}
      </p>
      <div>
        <p></p>
      </div>
    </div>
  </section>
</template>
