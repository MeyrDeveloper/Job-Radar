<script setup lang="ts">
import { useUserStore } from '@/entities/user/model/user-store.ts'
import Sidebar from '@/widgets/sidebar/Sidebar.vue'
import { computed, onMounted, provide } from 'vue'
import Header from '../../../widgets/header/Header.vue'

const store = useUserStore()

onMounted(() => {
  store.getUser('1234')
})

provide(
  'user',
  computed(() => store.user),
)
</script>
<template>
  <div class="flex">
    <Sidebar />

    <main class="container mx-auto px-2 flex-1 min-0">
      <Header />

      <router-view v-slot="{ Component }">
        <Suspense :timeout="4">
          <component :is="Component" />
          <template #fallback>
            <div class="page-loader">Загрузка страницы...</div>
          </template>
        </Suspense>
      </router-view>
    </main>
  </div>
</template>
