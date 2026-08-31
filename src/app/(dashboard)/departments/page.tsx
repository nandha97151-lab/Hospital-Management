'use client'
import { departments } from '@/lib/data'
import { Building2, Users, UserCog, DoorOpen, Plus } from 'lucide-react'

export default function DepartmentsPage() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Departments</h1>
          <p className="text-slate-500 text-sm">Overview of all hospital departments</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 text-sm font-medium shadow-lg shadow-blue-500/20">
          <Plus size={15} /> Add Department
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {departments.map(dept => (
          <div key={dept.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 stat-card">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                {dept.icon}
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-base">{dept.name}</h3>
                <p className="text-sm text-blue-600 font-medium">{dept.headDoctor}</p>
                <p className="text-xs text-slate-400">{dept.id} · Head of Department</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-blue-500 mb-1"><UserCog size={14} /></div>
                <p className="text-sm font-bold text-slate-800">{dept.doctors}</p>
                <p className="text-xs text-slate-400">Doctors</p>
              </div>
              <div className="text-center border-x border-slate-100">
                <div className="flex items-center justify-center gap-1 text-emerald-500 mb-1"><Users size={14} /></div>
                <p className="text-sm font-bold text-slate-800">{dept.patients}</p>
                <p className="text-xs text-slate-400">Patients</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-violet-500 mb-1"><DoorOpen size={14} /></div>
                <p className="text-sm font-bold text-slate-800">{dept.rooms}</p>
                <p className="text-xs text-slate-400">Rooms</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
