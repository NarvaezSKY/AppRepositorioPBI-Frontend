import { create } from "zustand"
import {
  loginUseCase,
  logoutUseCase,
} from "@/core/auth/application/auth.use-cases"
import { authRepository } from "@/core/auth/infrastructure/auth.repository"
import {
  clearAuthSession,
  getStoredSession,
  saveAuthSession,
  type IStoredUser,
} from "@/core/auth/infrastructure/token-storage"
import { getErrorMessage } from "@/core/shared/errors/get-error-message"

export type AuthUser = IStoredUser

const login = loginUseCase(authRepository)
const logout = logoutUseCase(authRepository)

interface AuthState {
  user: AuthUser | null
  accessToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  hydrateSession: () => void
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  clearError: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  hydrateSession: () => {
    const session = getStoredSession()
    if (!session) {
      set({ user: null, accessToken: null, isAuthenticated: false })
      return
    }
    set({ user: session.user, accessToken: session.accessToken, isAuthenticated: true })
  },

  login: async (email: string, password: string) => {
    if (!email || !password) {
      set({ error: "Credenciales inválidas" })
      throw new Error("Credenciales inválidas")
    }

    set({ isLoading: true, error: null })

    try {
      const res = await login({ email, password })
      const user: AuthUser = { ...res.user }
      saveAuthSession({ user, accessToken: res.token })
      set({ user, accessToken: res.token, isAuthenticated: true, isLoading: false })
    } catch (error) {
      const message = getErrorMessage(error, "No fue posible iniciar sesión")
      set({ isLoading: false, error: message })
      throw new Error(message)
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null })
    try {
      await logout()
    } catch {
    } finally {
      clearAuthSession()
      set({ user: null, accessToken: null, isAuthenticated: false, isLoading: false })
    }
  },

  clearError: () => set({ error: null }),
}))
