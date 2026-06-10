import axios from "axios"
import { BACKEND_URL } from "./config"
import {
  clearAuthSession,
  getAccessToken,
} from "@/core/auth/infrastructure/token-storage"

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  timeout: 15000,
})

axiosInstance.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`)
  }
  return config
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      clearAuthSession()
    }
    return Promise.reject(error)
  },
)

export default axiosInstance
