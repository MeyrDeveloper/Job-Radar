import { api } from '@/shared/api/base'
import type { User } from '../model/types'

export const fetchUser = async (id: string): Promise<User> => {
  const res = await api.get(`/users/${id}`)
  console.log(1)
  return res.data
}
