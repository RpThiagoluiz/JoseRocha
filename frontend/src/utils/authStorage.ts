import type { AuthUser } from '@/types'

const DEFAULT_STORAGE_KEY = 'app_auth_user'

/**
 * Returns the localStorage key for auth data (from env or default).
 */
export function getAuthStorageKey(): string {
  return import.meta.env.VITE_AUTH_STORAGE_KEY ?? DEFAULT_STORAGE_KEY
}

/**
 * Reads the stored auth user from localStorage. Returns null if missing or invalid.
 */
export function loadAuthUser(): AuthUser | null {
  try {
    const key = getAuthStorageKey()
    const raw = localStorage.getItem(key)
    if (!raw) return null
    const data = JSON.parse(raw) as AuthUser
    return data?.email ? data : null
  } catch {
    return null
  }
}

/**
 * Writes the auth user to localStorage, or removes the entry if user is null.
 */
export function saveAuthUser(user: AuthUser | null): void {
  const key = getAuthStorageKey()
  if (user) {
    localStorage.setItem(key, JSON.stringify(user))
  } else {
    localStorage.removeItem(key)
  }
}
