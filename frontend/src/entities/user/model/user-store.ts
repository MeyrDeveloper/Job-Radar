import type { Nullable } from '@/shared/types/utility'
import { AxiosError } from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchUser } from '../api/user'
import type { User } from './types'

export const useUserStore = defineStore('user', () => {
  const user = ref<Nullable<User>>(null)
  const isLoading = ref<boolean>(false)
  const error = ref<Nullable<string>>(null)

  const getUser = async (id: string) => {
    try {
      isLoading.value = true

      user.value = await fetchUser(id)
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        error.value = e.message
      } else {
        error.value = `Unexpected error occured - ${String(e)}`
      }
    } finally {
      isLoading.value = false
    }
  }

  return { user, isLoading, error, getUser }
})
