'use client'
import { useState } from 'react'
import { patients } from '@/lib/data'
import { Search, Plus, Edit2, Trash2, Eye, Filter, Download, ChevronLeft, ChevronRight } from 'lucide-react'

function getStatusBadge(status: string) {
  const cls: Record<string, string> = {
    Active: 'badge-active', Admitted: 'badge-admitted', Discharged: 'badge-discharged'
  }
  return `inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${cls[status] || 'bg-slate-100 text-slate-600'}`
}

const bloodGroupColors: Record<string, string> = {
  'O+': 'bg-red-100 text-red-700', 'O-': 'bg-red-200 text-red-800',
  'A+': 'bg-blue-100 text-blue-700', 'A-': 'bg-blue-200 text-blue-800',
  'B+': 'bg-green-100 text-green-700', 'B-': 'bg-green-200 text-green-800',
  'AB+': 'bg-purple-100 text-purple-700', 'AB-': 'bg-purple-200 text-purple-800',
}

export default function PatientsPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [page, setPage] = useState(1)
  const [selectedPatient, setSelectedPatient] = useState<typeof patients[0] | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)

  const filtered = patients.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.phone.includes(search)
    const matchStatus = statusFilter === 'All' || p.status === statusFilter
    return matchSearch && matchStatus
  })

  const perPage = 6
  const totalPages = Math.ceil(filtered.length / perPage)
  const paginated = filtered.slice((page - 1) * perPage, page * perPage)

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Patients</h1>
          <p className="text-slate-500 text-sm">Manage and view all patient records</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 text-sm font-medium transition-colors">
            <Download size={15} /> Export
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 text-sm font-medium transition-colors shadow-lg shadow-blue-500/20"
          >
            <Plus size={15} /> Add Patient
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
            placeholder="Search by name, ID, or phone..."
            className="form-input pl-9"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-slate-400" />
          {['All', 'Active', 'Admitted', 'Discharged'].map(s => (
            <button
              key={s}
              onClick={() => { setStatusFilter(s); setPage(1) }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                statusFilter === s ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-5 py-3.5">Patient</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-3 py-3.5">ID</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-3 py-3.5">Age / Gender</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-3 py-3.5">Blood Group</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-3 py-3.5">Department</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-3 py-3.5">Status</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-3 py-3.5">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map(p => (
                <tr key={p.id} className="table-row-hover border-t border-slate-50">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {p.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{p.name}</p>
                        <p className="text-xs text-slate-400">{p.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3.5"><span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-lg font-mono">{p.id}</span></td>
                  <td className="px-3 py-3.5 text-sm text-slate-600">{p.age} / {p.gender}</td>
                  <td className="px-3 py-3.5">
                    <span className={`text-xs font-bold px-2 py-1 rounded-lg ${bloodGroupColors[p.bloodGroup] || 'bg-slate-100 text-slate-600'}`}>
                      {p.bloodGroup}
                    </span>
                  </td>
                  <td className="px-3 py-3.5 text-sm text-slate-600">{p.department}</td>
                  <td className="px-3 py-3.5"><span className={getStatusBadge(p.status)}>{p.status}</span></td>
                  <td className="px-3 py-3.5">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setSelectedPatient(p)}
                        className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                        title="View Profile"
                      >
                        <Eye size={15} />
                      </button>
                      <button className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors" title="Edit">
                        <Edit2 size={15} />
                      </button>
                      <button className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors" title="Delete">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center text-slate-400 py-12">
                    No patients found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-5 py-3.5 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Showing {Math.min((page - 1) * perPage + 1, filtered.length)}–{Math.min(page * perPage, filtered.length)} of {filtered.length} patients
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
              <button
                key={num}
                onClick={() => setPage(num)}
                className={`w-7 h-7 rounded-lg text-xs font-medium transition-colors ${
                  page === num ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {num}
              </button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Patient Profile Modal */}
      {selectedPatient && (
        <div className="modal-overlay" onClick={() => setSelectedPatient(null)}>
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fade-in"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-800">Patient Profile</h2>
              <button onClick={() => setSelectedPatient(null)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500">
                ✕
              </button>
            </div>
            <div className="p-6 space-y-5">
              {/* Patient Header */}
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xl font-bold">
                  {selectedPatient.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">{selectedPatient.name}</h3>
                  <p className="text-blue-600 font-mono text-sm">{selectedPatient.id}</p>
                  <span className={`${
                    selectedPatient.status === 'Active' ? 'badge-active' : 
                    selectedPatient.status === 'Admitted' ? 'badge-admitted' : 'badge-discharged'
                  } px-2.5 py-0.5 rounded-full text-xs font-medium inline-flex mt-1`}>
                    {selectedPatient.status}
                  </span>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Date of Birth', value: selectedPatient.dateOfBirth },
                  { label: 'Gender', value: selectedPatient.gender },
                  { label: 'Blood Group', value: selectedPatient.bloodGroup },
                  { label: 'Phone', value: selectedPatient.phone },
                  { label: 'Email', value: selectedPatient.email || '—' },
                  { label: 'Address', value: selectedPatient.address },
                  { label: 'Emergency Contact', value: selectedPatient.emergencyContact },
                  { label: 'Registration Date', value: selectedPatient.registrationDate },
                ].map(item => (
                  <div key={item.label}>
                    <p className="text-xs text-slate-400 mb-0.5">{item.label}</p>
                    <p className="text-sm font-medium text-slate-800">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Medical Info */}
              <div className="border-t border-slate-100 pt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-400 mb-0.5">Assigned Doctor</p>
                  <p className="text-sm font-medium text-slate-800">{selectedPatient.doctor}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-0.5">Department</p>
                  <p className="text-sm font-medium text-slate-800">{selectedPatient.department}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-0.5">Diagnosis</p>
                  <p className="text-sm font-medium text-slate-800">{selectedPatient.diagnosis}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-0.5">Last Visit</p>
                  <p className="text-sm font-medium text-slate-800">{selectedPatient.lastVisit}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Patient Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-fade-in"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-5 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-800">Add New Patient</h2>
              <button onClick={() => setShowAddModal(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500">✕</button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Full Name *</label>
                  <input className="form-input" placeholder="Patient full name" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Date of Birth *</label>
                  <input type="date" className="form-input" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Gender *</label>
                  <select className="form-input">
                    <option>Male</option><option>Female</option><option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Blood Group *</label>
                  <select className="form-input">
                    {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map(bg => (
                      <option key={bg}>{bg}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Phone Number *</label>
                  <input className="form-input" placeholder="10-digit mobile" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Email</label>
                  <input type="email" className="form-input" placeholder="patient@email.com" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">Address *</label>
                <textarea className="form-input resize-none" rows={2} placeholder="Full address" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">Emergency Contact *</label>
                <input className="form-input" placeholder="Emergency contact number" />
              </div>
            </div>
            <div className="px-5 pb-5 flex gap-3 justify-end">
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 text-sm">
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 text-sm font-medium shadow-lg shadow-blue-500/20">
                Add Patient
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
