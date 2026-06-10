import {
  useEffect,
  type ReactNode,
} from "react"
import { useAuthStore, type AuthUser } from "@/store/auth-store"

interface AuthContextValue {
  user: AuthUser | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const hydrateSession = useAuthStore((state) => state.hydrateSession)

  useEffect(() => {
    hydrateSession()
  }, [hydrateSession])

  return <>{children}</>
}

export function useAuth() {
  const user = useAuthStore((state) => state.user)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const login = useAuthStore((state) => state.login)
  const logout = useAuthStore((state) => state.logout)

  const value: AuthContextValue = {
    user,
    isAuthenticated,
    login,
    logout,
  }

  return value
}
