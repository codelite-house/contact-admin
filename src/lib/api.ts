import axios from 'axios'
import { env } from '@/lib/env'

const apiClient = axios.create({
  baseURL: env.API_URL || 'http://localhost:5050',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10_000,
})

export function setAuthToken(token: string | null) {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete apiClient.defaults.headers.common['Authorization']
  }
}

apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      window.dispatchEvent(new CustomEvent('contact-admin:unauthorized'))
    }
    return Promise.reject(err)
  },
)

export default apiClient
