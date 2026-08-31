'use client'
import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Activity, AlertCircle, ChevronDown } from 'lucide-react'

const DEMO_CREDENTIALS = [
  { role: 'Admin', email: 'admin@hospital.com', password: 'admin123', color: 'bg-blue-600' },
  { role: 'Doctor', email: 'arun@hospital.com', password: 'doctor123', color: 'bg-emerald-600' },
  { role: 'Receptionist', email: 'receptionist@hospital.com', password: 'recept123', color: 'bg-violet-600' },
  { role: 'Nurse', email: 'nurse@hospital.com', password: 'nurse123', color: 'bg-pink-600' },
  { role: 'Pharmacist', email: 'pharmacist@hospital.com', password: 'pharma123', color: 'bg-orange-600' },
  { role: 'Lab Tech', email: 'lab@hospital.com', password: 'lab123', color: 'bg-teal-600' },
]

export default function LoginPage() {
  const { login } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    await new Promise(r => setTimeout(r, 600))
    const success = login(email, password)
    if (success) {
      router.push('/dashboard')
    } else {
      setError('Invalid email or password. Use the demo credentials below.')
    }
    setLoading(false)
  }

  const fillCredentials = (cred: typeof DEMO_CREDENTIALS[0]) => {
    setEmail(cred.email)
    setPassword(cred.password)
    setError('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-400 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
              <Activity className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-xl leading-none">MediCare</h1>
              <p className="text-blue-300 text-xs">Hospital Management System</p>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
            Modern Healthcare<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Management
            </span>
          </h2>
          <p className="text-slate-300 text-lg mb-12">
            Streamline hospital operations with our comprehensive digital management platform.
          </p>
        </div>
        <div className="relative z-10 grid grid-cols-3 gap-4">
          {[
            { value: '1,248', label: 'Patients Registered' },
            { value: '28+', label: 'Specialist Doctors' },
            { value: '99.8%', label: 'Uptime Reliability' },
          ].map(stat => (
            <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-slate-400 text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Logo (mobile) */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-none">MediCare HMS</h1>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-1">Welcome Back</h2>
            <p className="text-slate-500 text-sm mb-6">Sign in to access the hospital management portal</p>

            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-5 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email / Username</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="form-input"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="form-input pr-10"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={e => setRemember(e.target.checked)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  Remember me
                </label>
                <button type="button" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Forgot Password?
                </button>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/25 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : 'Sign In'}
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 pt-6 border-t border-slate-100">
              <p className="text-xs text-slate-500 mb-3 flex items-center gap-1.5">
                <ChevronDown className="w-3 h-3" />
                Click to use demo credentials
              </p>
              <div className="grid grid-cols-3 gap-2">
                {DEMO_CREDENTIALS.map(cred => (
                  <button
                    key={cred.role}
                    type="button"
                    onClick={() => fillCredentials(cred)}
                    className={`${cred.color} text-white text-xs font-medium py-1.5 px-2 rounded-lg hover:opacity-90 transition-opacity`}
                  >
                    {cred.role}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <p className="text-center text-slate-400 text-xs mt-6">
            MediCare HMS v2.0 &bull; Secure Healthcare Platform
          </p>
        </div>
      </div>
    </div>
  )
}
