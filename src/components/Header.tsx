'use client'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Menu, Search, Bell, LogOut, Settings, User, X, Clock } from 'lucide-react'
import { notifications } from '@/lib/data'

interface HeaderProps {
  onMenuToggle: () => void
}

const searchSuggestions = [
  { label: 'Rajesh Khanna', type: 'Patient', id: 'PT-1001' },
  { label: 'Anita Desai', type: 'Patient', id: 'PT-1002' },
  { label: 'Dr. Arun Kumar', type: 'Doctor', id: 'DR-1001' },
  { label: 'Dr. Priya Sharma', type: 'Doctor', id: 'DR-1002' },
  { label: 'INV-1001', type: 'Invoice', id: 'INV-1001' },
  { label: 'APT-1001', type: 'Appointment', id: 'APT-1001' },
  { label: 'Paracetamol 500mg', type: 'Medicine', id: 'MED-001' },
  { label: 'CBC Test', type: 'Lab Test', id: 'LAB-001' },
]

export default function Header({ onMenuToggle }: HeaderProps) {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const filteredSuggestions = searchQuery.length > 1
    ? searchSuggestions.filter(s =>
        s.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []

  const unreadCount = notifications.filter(n => !n.read).length

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 z-30 bg-white border-b border-slate-200 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search Bar */}
          <div className="relative" ref={searchRef}>
            <div className={`flex items-center gap-2 transition-all duration-300 ${searchOpen ? 'w-72 sm:w-96' : 'w-40 sm:w-60'}`}>
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchOpen(true)}
                  placeholder="Search patients, doctors..."
                  className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Search Dropdown */}
            {searchOpen && filteredSuggestions.length > 0 && (
              <div className="absolute top-full left-0 mt-1 w-80 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden animate-fade-in">
                {filteredSuggestions.map(s => (
                  <button
                    key={s.id}
                    className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-slate-50 text-left text-sm"
                    onClick={() => { setSearchQuery(s.label); setSearchOpen(false) }}
                  >
                    <span className="text-slate-800">{s.label}</span>
                    <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{s.type}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Date & Time */}
          <div className="hidden md:flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs text-slate-600 font-medium">
              {currentTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-xs text-slate-500">
              {currentTime.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
            </span>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false) }}
              className="relative p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-full mt-1 w-80 bg-white rounded-xl shadow-xl border border-slate-200 z-50 animate-fade-in overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center">
                  <span className="font-semibold text-slate-800 text-sm">Notifications</span>
                  <span className="text-xs text-blue-600 cursor-pointer hover:underline">{unreadCount} unread</span>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifications.map(n => (
                    <div key={n.id} className={`px-4 py-3 hover:bg-slate-50 border-b border-slate-50 ${!n.read ? 'bg-blue-50/50' : ''}`}>
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${!n.read ? 'bg-blue-500' : 'bg-slate-300'}`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800">{n.title}</p>
                          <p className="text-xs text-slate-500 truncate">{n.message}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{n.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => { setShowProfile(!showProfile); setShowNotifications(false) }}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white text-xs font-bold">
                {user?.avatar}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold text-slate-700 leading-none">{user?.name}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{user?.role.replace('_', ' ')}</p>
              </div>
            </button>

            {showProfile && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-xl border border-slate-200 z-50 animate-fade-in overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-100">
                  <p className="text-sm font-semibold text-slate-800">{user?.name}</p>
                  <p className="text-xs text-slate-500">{user?.email}</p>
                </div>
                <div className="py-1">
                  <button className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                    <User className="w-4 h-4 text-slate-400" />
                    My Profile
                  </button>
                  <button className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                    <Settings className="w-4 h-4 text-slate-400" />
                    Settings
                  </button>
                  <div className="border-t border-slate-100 mt-1 pt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close */}
      {(showNotifications || showProfile || searchOpen) && (
        <div
          className="fixed inset-0 z-20"
          onClick={() => { setShowNotifications(false); setShowProfile(false); setSearchOpen(false) }}
        />
      )}
    </header>
  )
}
