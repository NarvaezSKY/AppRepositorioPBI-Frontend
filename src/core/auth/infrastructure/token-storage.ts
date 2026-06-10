import type { ILoginUserDto } from "../domain/login/login.res"

/** Usuario tal como se persiste en sessionStorage. */
export type IStoredUser = ILoginUserDto

export interface IStoredSession {
  user: IStoredUser
  accessToken: string
}

const ACCESS_TOKEN_KEY = "sena_access_token"
const AUTH_USER_KEY = "sena_auth_user"

function storage() {
  return typeof window !== "undefined" ? window.sessionStorage : null
}

export function getAccessToken(): string | null {
  return storage()?.getItem(ACCESS_TOKEN_KEY) ?? null
}

export function getStoredUser(): IStoredUser | null {
  const raw = storage()?.getItem(AUTH_USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as IStoredUser
  } catch {
    return null
  }
}

export function saveAuthSession(session: IStoredSession): void {
  const s = storage()
  if (!s) return
  s.setItem(ACCESS_TOKEN_KEY, session.accessToken)
  s.setItem(AUTH_USER_KEY, JSON.stringify(session.user))
}

export function clearAuthSession(): void {
  const s = storage()
  if (!s) return
  s.removeItem(ACCESS_TOKEN_KEY)
  s.removeItem(AUTH_USER_KEY)
}

export function getStoredSession(): IStoredSession | null {
  const user = getStoredUser()
  const accessToken = getAccessToken()
  if (!user || !accessToken) return null
  return { user, accessToken }
}
