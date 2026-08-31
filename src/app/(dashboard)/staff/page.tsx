'use client'
import { staff } from '@/lib/data'
import { Search, Plus, Edit2, Trash2 } from 'lucide-react'
import { useState } from 'react'

const roleColors: Record<string, string> = {
  'Head Nurse': 'bg-pink-100 text-pink-700',
  'Receptionist': 'bg-violet-100 text-violet-700',
  'Pharmacist': 'bg-orange-100 text-orange-700',
  'Lab Technician': 'bg-teal-100 text-teal-700',
  'Nurse': 'bg-pink-50 text-pink-600',
  'Administrator': 'bg-blue-100 text-blue-700',
}

export default function StaffPage() {
  const [search, setSearch] = useState('')

  const filtered = staff.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.role.toLowerCase().includes(search.toLowerCase()) ||
    s.id.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Staff Management</h1>
          <p className="text-slate-500 text-sm">Manage all hospital staff members</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 text-sm font-medium shadow-lg shadow-blue-500/20">
          <Plus size={15} /> Add Staff
        </button>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search staff..." className="form-input pl-9" />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {['Staff', 'ID', 'Role', 'Department', 'Contact', 'Joining Date', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id} className="table-row-hover border-t border-slate-50">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white text-xs font-bold">
                        {s.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{s.name}</p>
                        <p className="text-xs text-slate-400">{s.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5"><span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-1 rounded-lg">{s.id}</span></td>
                  <td className="px-4 py-3.5"><span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${roleColors[s.role] || 'bg-slate-100 text-slate-600'}`}>{s.role}</span></td>
                  <td className="px-4 py-3.5 text-sm text-slate-600">{s.department}</td>
                  <td className="px-4 py-3.5 text-sm text-slate-500">{s.phone}</td>
                  <td className="px-4 py-3.5 text-sm text-slate-600">{s.joiningDate}</td>
                  <td className="px-4 py-3.5"><span className="badge-active px-2.5 py-1 rounded-full text-xs font-medium">{s.status}</span></td>
                  <td className="px-4 py-3.5">
                    <div className="flex gap-1">
                      <button className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"><Edit2 size={14} /></button>
                      <button className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
