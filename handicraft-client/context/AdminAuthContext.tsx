'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface Admin {
  id: string
  email: string
}

interface AdminAuthContextType {
  admin: Admin | null
  accessToken: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null)

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)

  const login = async (email: string, password: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.message)

    setAdmin(data.admin)
    setAccessToken(data.accessToken)
    localStorage.setItem('accessToken', data.accessToken)
    localStorage.setItem('admin', JSON.stringify(data.admin))
  }

  const logout = () => {
    setAdmin(null)
    setAccessToken(null)
    localStorage.removeItem('accessToken')
    localStorage.removeItem('admin')
  }

  return (
    <AdminAuthContext.Provider value={{ admin, accessToken, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (!context) throw new Error('useAdminAuth must be used within AdminAuthProvider')
  return context
}