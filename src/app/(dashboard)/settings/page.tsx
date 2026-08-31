'use client'
import { useAuth } from '@/lib/auth-context'
import { Shield, Bell, Palette, Globe, Lock, Save } from 'lucide-react'

export default function SettingsPage() {
  const { user } = useAuth()

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
        <p className="text-slate-500 text-sm">Manage your account and application preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-5">
          {/* Profile Settings */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <h2 className="text-base font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Shield size={18} className="text-blue-600" /> Profile Settings
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">Full Name</label>
                <input className="form-input" defaultValue={user?.name || ''} />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">Email</label>
                <input className="form-input" defaultValue={user?.email || ''} />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">Phone</label>
                <input className="form-input" defaultValue="+91 98765 43210" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">Role</label>
                <input className="form-input bg-slate-50" defaultValue={user?.role.replace('_', ' ') || ''} disabled />
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <h2 className="text-base font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Lock size={18} className="text-blue-600" /> Security
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">Current Password</label>
                <input type="password" className="form-input" placeholder="Enter current password" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">New Password</label>
                  <input type="password" className="form-input" placeholder="Enter new password" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Confirm Password</label>
                  <input type="password" className="form-input" placeholder="Confirm new password" />
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div>
                  <p className="text-sm font-medium text-slate-800">Two-Factor Authentication</p>
                  <p className="text-xs text-slate-500">Extra security layer for your account</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-10 h-5 bg-slate-200 peer-checked:bg-blue-600 rounded-full peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <h2 className="text-base font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Bell size={18} className="text-blue-600" /> Notification Preferences
            </h2>
            <div className="space-y-3">
              {[
                { label: 'New Appointment', desc: 'Get notified when a new appointment is booked', checked: true },
                { label: 'Appointment Reminders', desc: 'Receive reminders before scheduled appointments', checked: true },
                { label: 'Emergency Alerts', desc: 'Critical emergency case notifications', checked: true },
                { label: 'Low Medicine Stock', desc: 'Alert when medicine stock runs low', checked: true },
                { label: 'Lab Results', desc: 'Notification when lab results are ready', checked: false },
                { label: 'Payment Received', desc: 'Confirmation when a payment is processed', checked: false },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div>
                    <p className="text-sm font-medium text-slate-800">{item.label}</p>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked={item.checked} className="sr-only peer" />
                    <div className="w-10 h-5 bg-slate-200 peer-checked:bg-blue-600 rounded-full peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          {/* Appearance */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <h2 className="text-base font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Palette size={18} className="text-blue-600" /> Appearance
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">Theme</label>
                <select className="form-input">
                  <option>Light</option>
                  <option>Dark</option>
                  <option>System Default</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-2">Accent Color</label>
                <div className="flex gap-2">
                  {['bg-blue-600', 'bg-emerald-600', 'bg-violet-600', 'bg-rose-600', 'bg-amber-600'].map((color) => (
                    <button
                      key={color}
                      className={`w-8 h-8 ${color} rounded-full border-2 border-transparent hover:border-slate-400 transition-colors ${color === 'bg-blue-600' ? 'ring-2 ring-blue-400 ring-offset-2' : ''}`}
                    />
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">Sidebar Style</label>
                <select className="form-input">
                  <option>Default Dark</option>
                  <option>Light</option>
                  <option>Compact</option>
                </select>
              </div>
            </div>
          </div>

          {/* Language */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <h2 className="text-base font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Globe size={18} className="text-blue-600" /> Language & Region
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">Language</label>
                <select className="form-input">
                  <option>English</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">Date Format</label>
                <select className="form-input">
                  <option>DD/MM/YYYY</option>
                  <option>MM/DD/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">Time Zone</label>
                <select className="form-input">
                  <option>Asia/Kolkata (IST)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">Currency</label>
                <select className="form-input">
                  <option>INR (₹)</option>
                  <option>USD ($)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Audit Log */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <h2 className="text-sm font-semibold text-slate-800 mb-3">Recent Activity</h2>
            <div className="space-y-2.5">
              {[
                { action: 'Logged in', time: '2 min ago' },
                { action: 'Updated patient PT-1001', time: '1 hour ago' },
                { action: 'Created invoice INV-1005', time: '3 hours ago' },
                { action: 'Changed password', time: 'Yesterday' },
              ].map((log, i) => (
                <div key={i} className="flex items-center justify-between py-1.5">
                  <span className="text-xs text-slate-700">{log.action}</span>
                  <span className="text-[10px] text-slate-400">{log.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Save */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 flex items-center justify-between">
        <p className="text-sm text-slate-500">Make sure to save your changes before leaving.</p>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 text-sm font-medium transition-colors shadow-lg shadow-blue-500/20">
          <Save size={15} /> Save Changes
        </button>
      </div>
    </div>
  )
}
