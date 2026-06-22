'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface User {
  id: string
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users for demo
const MOCK_USERS = {
  'admin@mwala.com': { id: '1', name: 'Admin User', password: 'password123' },
  'test@mwala.com': { id: '2', name: 'Test User', password: 'password123' },
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Check if user is already logged in (on mount and page refresh)
  useEffect(() => {
    const storedUser = localStorage.getItem('mwala_user')
    const storedToken = localStorage.getItem('mwala_token')

    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (err) {
        localStorage.removeItem('mwala_user')
        localStorage.removeItem('mwala_token')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Validate credentials
      const mockUser = MOCK_USERS[email as keyof typeof MOCK_USERS]
      if (!mockUser) {
        throw new Error('Invalid email address')
      }

      if (mockUser.password !== password) {
        throw new Error('Invalid password')
      }

      // Create session
      const userData: User = {
        id: mockUser.id,
        email,
        name: mockUser.name,
      }

      // Store in localStorage
      localStorage.setItem('mwala_user', JSON.stringify(userData))
      localStorage.setItem('mwala_token', `token_${mockUser.id}_${Date.now()}`)

      setUser(userData)
      setError(null)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('mwala_user')
    localStorage.removeItem('mwala_token')
    setUser(null)
    setError(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
