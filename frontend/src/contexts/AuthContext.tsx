/* eslint-disable react-refresh/only-export-components -- Auth context and useAuth are intentionally co-located. */
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { AuthUser } from '@/types'
import { loadAuthUser, saveAuthUser } from '@/utils/authStorage'

interface AuthContextValue {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

const FAKE_LOADING_MS = 1500

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(loadAuthUser)
  const [isLoading, setIsLoading] = useState(false)

  const login = useCallback(async (email: string, password: string) => {
    void password // Reserved for future real API auth
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, FAKE_LOADING_MS))
    const nextUser: AuthUser = { email }
    setUser(nextUser)
    saveAuthUser(nextUser)
    setIsLoading(false)
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    saveAuthUser(null)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      login,
      logout,
    }),
    [user, isLoading, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return ctx
}
