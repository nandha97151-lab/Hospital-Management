'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react'

export type Role = 'ADMIN' | 'DOCTOR' | 'RECEPTIONIST' | 'NURSE' | 'PHARMACIST' | 'LAB_TECHNICIAN'

interface AuthUser {
  name: string
  email: string
  role: Role
  avatar: string
}

interface AuthContextType {
  user: AuthUser | null
  login: (email: string, password: string) => boolean
  logout: () => void
}

const DEMO_USERS: Record<string, AuthUser & { password: string }> = {
  'admin@hospital.com': { name: 'Super Admin', email: 'admin@hospital.com', role: 'ADMIN', avatar: 'SA', password: 'admin123' },
  'arun@hospital.com': { name: 'Dr. Arun Kumar', email: 'arun@hospital.com', role: 'DOCTOR', avatar: 'AK', password: 'doctor123' },
  'receptionist@hospital.com': { name: 'Deepa Anand', email: 'receptionist@hospital.com', role: 'RECEPTIONIST', avatar: 'DA', password: 'recept123' },
  'nurse@hospital.com': { name: 'Radha Krishnan', email: 'nurse@hospital.com', role: 'NURSE', avatar: 'RK', password: 'nurse123' },
  'pharmacist@hospital.com': { name: 'Raj Prabhu', email: 'pharmacist@hospital.com', role: 'PHARMACIST', avatar: 'RP', password: 'pharma123' },
  'lab@hospital.com': { name: 'Anand Subramanian', email: 'lab@hospital.com', role: 'LAB_TECHNICIAN', avatar: 'AS', password: 'lab123' },
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)

  const login = (email: string, password: string): boolean => {
    const found = DEMO_USERS[email]
    if (found && found.password === password) {
      const { password: _, ...userData } = found
      setUser(userData)
      return true
    }
    return false
  }

  const logout = () => setUser(null)

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
