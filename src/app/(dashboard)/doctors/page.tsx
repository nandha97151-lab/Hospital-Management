'use client'
import { useState } from 'react'
import { doctors } from '@/lib/data'
import { Search, Plus, Star, Phone, Mail, Clock, Filter } from 'lucide-react'

const statusColors: Record<string, string> = {
  Available: 'bg-emerald-100 text-emerald-700',
  'In Surgery': 'bg-orange-100 text-orange-700',
  'Off Duty': 'bg-slate-100 text-slate-600',
  Busy: 'bg-red-100 text-red-700',
}

const deptFilters = ['All', 'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'General Medicine', 'Dermatology', 'ENT', 'Gynecology']

export default function DoctorsPage() {
  const [search, setSearch] = useState('')
  const [deptFilter, setDeptFilter] = useState('All')
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState<typeof doctors[0] | null>(null)

  const filtered = doctors.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialization.toLowerCase().includes(search.toLowerCase()) ||
      d.id.toLowerCase().includes(search.toLowerCase())
    const matchDept = deptFilter === 'All' || d.department === deptFilter
    return matchSearch && matchDept
  })

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Doctors</h1>
          <p className="text-slate-500 text-sm">Manage medical staff and specialists</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 text-sm font-medium transition-colors shadow-lg shadow-blue-500/20 w-fit"
        >
          <Plus size={15} /> Add Doctor
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, specialization, ID..."
            className="form-input pl-9"
          />
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <Filter size={14} className="text-slate-400" />
          {deptFilters.map(d => (
            <button
              key={d}
              onClick={() => setDeptFilter(d)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                deptFilter === d ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Doctor Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(doc => (
          <div
            key={doc.id}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 stat-card cursor-pointer"
            onClick={() => setSelectedDoctor(doc)}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-lg font-bold flex-shrink-0 shadow-lg">
                {doc.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-800 text-base leading-tight">{doc.name}</h3>
                <p className="text-blue-600 text-sm font-medium">{doc.specialization}</p>
                <p className="text-slate-400 text-xs">{doc.department} · {doc.id}</p>
              </div>
              <span className={`px-2 py-1 rounded-lg text-xs font-medium flex-shrink-0 ${statusColors[doc.status] || 'bg-slate-100 text-slate-600'}`}>
                {doc.status}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Phone size={12} className="text-slate-400 flex-shrink-0" />
                {doc.phone}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Mail size={12} className="text-slate-400 flex-shrink-0" />
                <span className="truncate">{doc.email}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Clock size={12} className="text-slate-400 flex-shrink-0" />
                {doc.availability}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <div className="text-center">
                <p className="text-sm font-bold text-slate-800">{doc.experience}yr</p>
                <p className="text-[10px] text-slate-400">Experience</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-slate-800">{doc.patients}</p>
                <p className="text-[10px] text-slate-400">Patients</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-slate-800">₹{doc.consultationFee}</p>
                <p className="text-[10px] text-slate-400">Consultation</p>
              </div>
              <div className="flex items-center gap-1">
                <Star size={12} className="text-amber-400 fill-amber-400" />
                <span className="text-sm font-bold text-slate-800">{doc.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Doctor Profile Modal */}
      {selectedDoctor && (
        <div className="modal-overlay" onClick={() => setSelectedDoctor(null)}>
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-fade-in"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-5 border-b border-slate-100 flex justify-between items-center">
              <h2 className="font-bold text-slate-800 text-lg">Doctor Profile</h2>
              <button onClick={() => setSelectedDoctor(null)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500">✕</button>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-center gap-5 p-4 bg-blue-50 rounded-xl">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                  {selectedDoctor.avatar}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">{selectedDoctor.name}</h3>
                  <p className="text-blue-600 font-medium">{selectedDoctor.specialization}</p>
                  <p className="text-slate-500 text-sm">{selectedDoctor.department}</p>
                  <span className={`${statusColors[selectedDoctor.status]} px-2 py-0.5 rounded-lg text-xs font-medium inline-flex mt-1`}>
                    {selectedDoctor.status}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Doctor ID', value: selectedDoctor.id },
                  { label: 'Qualification', value: selectedDoctor.qualification },
                  { label: 'Experience', value: `${selectedDoctor.experience} years` },
                  { label: 'Phone', value: selectedDoctor.phone },
                  { label: 'Email', value: selectedDoctor.email },
                  { label: 'Consultation Fee', value: `₹${selectedDoctor.consultationFee}` },
                  { label: 'Availability', value: selectedDoctor.availability },
                  { label: 'Rating', value: `${selectedDoctor.rating} / 5.0` },
                ].map(item => (
                  <div key={item.label}>
                    <p className="text-xs text-slate-400 mb-0.5">{item.label}</p>
                    <p className="text-sm font-medium text-slate-800">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Doctor Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-fade-in"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-5 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-800">Add New Doctor</h2>
              <button onClick={() => setShowAddModal(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500">✕</button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs font-medium text-slate-700 mb-1.5">Full Name *</label><input className="form-input" placeholder="Dr. Full Name" /></div>
                <div><label className="block text-xs font-medium text-slate-700 mb-1.5">Specialization *</label><input className="form-input" placeholder="e.g. Cardiologist" /></div>
                <div><label className="block text-xs font-medium text-slate-700 mb-1.5">Department *</label>
                  <select className="form-input">
                    {deptFilters.filter(d => d !== 'All').map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div><label className="block text-xs font-medium text-slate-700 mb-1.5">Qualification *</label><input className="form-input" placeholder="MBBS, MD..." /></div>
                <div><label className="block text-xs font-medium text-slate-700 mb-1.5">Experience (Years) *</label><input type="number" className="form-input" placeholder="10" /></div>
                <div><label className="block text-xs font-medium text-slate-700 mb-1.5">Consultation Fee (₹) *</label><input type="number" className="form-input" placeholder="500" /></div>
                <div><label className="block text-xs font-medium text-slate-700 mb-1.5">Phone *</label><input className="form-input" placeholder="9811111111" /></div>
                <div><label className="block text-xs font-medium text-slate-700 mb-1.5">Email *</label><input type="email" className="form-input" placeholder="doctor@hospital.com" /></div>
              </div>
              <div><label className="block text-xs font-medium text-slate-700 mb-1.5">Availability *</label><input className="form-input" placeholder="09:00 AM - 01:00 PM" /></div>
            </div>
            <div className="px-5 pb-5 flex gap-3 justify-end">
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 text-sm">Cancel</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 text-sm font-medium shadow-lg shadow-blue-500/20">Add Doctor</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
