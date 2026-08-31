'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import {
  LayoutDashboard, Users, UserCog, CalendarDays, Building2, FileText,
  Pill, FlaskConical, Receipt, BedDouble, Clipboard, UserSquare2,
  BarChart3, Settings, Activity, X, Stethoscope, FileHeart
} from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['ADMIN', 'DOCTOR', 'RECEPTIONIST', 'NURSE', 'PHARMACIST', 'LAB_TECHNICIAN'] },
  { href: '/patients', label: 'Patients', icon: Users, roles: ['ADMIN', 'DOCTOR', 'RECEPTIONIST', 'NURSE'] },
  { href: '/doctors', label: 'Doctors', icon: Stethoscope, roles: ['ADMIN', 'RECEPTIONIST'] },
  { href: '/appointments', label: 'Appointments', icon: CalendarDays, roles: ['ADMIN', 'DOCTOR', 'RECEPTIONIST', 'NURSE'] },
  { href: '/departments', label: 'Departments', icon: Building2, roles: ['ADMIN'] },
  { href: '/medical-records', label: 'Medical Records', icon: FileHeart, roles: ['ADMIN', 'DOCTOR', 'NURSE'] },
  { href: '/prescriptions', label: 'Prescriptions', icon: FileText, roles: ['ADMIN', 'DOCTOR', 'NURSE'] },
  { href: '/pharmacy', label: 'Pharmacy', icon: Pill, roles: ['ADMIN', 'PHARMACIST'] },
  { href: '/laboratory', label: 'Laboratory', icon: FlaskConical, roles: ['ADMIN', 'DOCTOR', 'LAB_TECHNICIAN'] },
  { href: '/billing', label: 'Billing', icon: Receipt, roles: ['ADMIN', 'RECEPTIONIST'] },
  { href: '/admissions', label: 'Admissions', icon: Clipboard, roles: ['ADMIN', 'RECEPTIONIST', 'NURSE'] },
  { href: '/beds', label: 'Beds & Rooms', icon: BedDouble, roles: ['ADMIN', 'NURSE', 'RECEPTIONIST'] },
  { href: '/staff', label: 'Staff', icon: UserSquare2, roles: ['ADMIN'] },
  { href: '/reports', label: 'Reports', icon: BarChart3, roles: ['ADMIN'] },
  { href: '/settings', label: 'Settings', icon: Settings, roles: ['ADMIN', 'DOCTOR', 'RECEPTIONIST', 'NURSE', 'PHARMACIST', 'LAB_TECHNICIAN'] },
]

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const { user } = useAuth()

  const allowedNav = navItems.filter(item =>
    user ? item.roles.includes(user.role) : false
  )

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 z-50 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ background: '#0f172a' }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-slate-700/50">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-white font-bold text-base leading-none">MediCare</span>
              <span className="block text-slate-400 text-[10px]">HMS v2.0</span>
            </div>
          </Link>
          <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Role Badge */}
        {user && (
          <div className="mx-4 mt-4 mb-2 bg-blue-900/40 border border-blue-700/30 rounded-xl p-3 flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {user.avatar}
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-medium truncate">{user.name}</p>
              <p className="text-blue-300 text-xs">{user.role.replace('_', ' ')}</p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-3 py-3 overflow-y-auto">
          <div className="space-y-0.5">
            {allowedNav.map(item => {
              const Icon = item.icon
              const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'sidebar-active'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4.5 h-4.5 flex-shrink-0" size={18} />
                  {item.label}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-slate-700/50">
          <p className="text-slate-600 text-xs text-center">© 2024 MediCare HMS</p>
        </div>
      </aside>
    </>
  )
}
