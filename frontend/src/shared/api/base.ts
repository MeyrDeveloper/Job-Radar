import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.API_URL || 'localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  // additional logic here
  return config
})
