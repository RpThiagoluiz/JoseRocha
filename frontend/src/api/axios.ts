import axios from 'axios'

/**
 * Axios instance for API requests.
 * Base URL from env (VITE_BASE_URL).
 */
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // eslint-disable-next-line no-console
    console.error('[API Error]', error?.response?.data ?? error.message)
    return Promise.reject(error)
  }
)
