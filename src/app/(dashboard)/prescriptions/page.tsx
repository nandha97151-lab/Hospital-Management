'use client'
import { prescriptions } from '@/lib/data'
import { FileText, Plus, Printer, Search } from 'lucide-react'
import { useState } from 'react'

export default function PrescriptionsPage() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<typeof prescriptions[0] | null>(null)

  const filtered = prescriptions.filter(p =>
    p.patient.toLowerCase().includes(search.toLowerCase()) ||
    p.doctor.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Prescriptions</h1>
          <p className="text-slate-500 text-sm">Create and manage patient prescriptions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 text-sm font-medium shadow-lg shadow-blue-500/20">
          <Plus size={15} /> New Prescription
        </button>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search prescriptions..." className="form-input pl-9" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(prx => (
          <div key={prx.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 stat-card">
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="text-xs font-mono text-slate-400">{prx.id}</span>
                <h3 className="font-bold text-slate-800 mt-0.5">{prx.patient}</h3>
                <p className="text-blue-600 text-sm">{prx.doctor}</p>
              </div>
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <FileText size={18} className="text-blue-600" />
              </div>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 mb-4">
              <p className="text-xs text-slate-400 mb-0.5">Diagnosis</p>
              <p className="text-sm font-medium text-slate-700">{prx.diagnosis}</p>
              <p className="text-xs text-slate-400 mt-1">Date: {prx.date}</p>
            </div>
            <div className="space-y-1.5 mb-4">
              <p className="text-xs font-semibold text-slate-500">Medicines ({prx.medicines.length})</p>
              {prx.medicines.map((m, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span className="text-xs text-slate-700">{m.name} — {m.frequency} × {m.duration}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => setSelected(prx)} className="flex-1 py-1.5 text-xs bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium">View</button>
              <button className="flex items-center gap-1 px-3 py-1.5 text-xs bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors">
                <Printer size={11} /> Print
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Prescription Detail Modal */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-fade-in" onClick={e => e.stopPropagation()}>
            <div className="bg-blue-600 rounded-t-2xl p-5 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-blue-200 text-xs">{selected.id}</p>
                  <h2 className="text-lg font-bold">MediCare Hospital</h2>
                  <p className="text-blue-200 text-xs mt-0.5">Date: {selected.date}</p>
                </div>
                <button onClick={() => setSelected(null)} className="text-white/70 hover:text-white">✕</button>
              </div>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-xs text-slate-400">Patient</p><p className="font-semibold text-slate-800">{selected.patient}</p><p className="text-xs text-slate-400">{selected.patientId}</p></div>
                <div><p className="text-xs text-slate-400">Doctor</p><p className="font-semibold text-slate-800">{selected.doctor}</p></div>
              </div>
              <div><p className="text-xs text-slate-400 mb-1">Diagnosis</p><div className="bg-slate-50 rounded-xl p-3"><p className="text-sm font-medium text-slate-800">{selected.diagnosis}</p></div></div>
              <div>
                <p className="text-xs font-semibold text-slate-500 mb-2">MEDICINES PRESCRIBED</p>
                <div className="space-y-3">
                  {selected.medicines.map((m, i) => (
                    <div key={i} className="bg-slate-50 rounded-xl p-3 grid grid-cols-2 gap-2">
                      <div><p className="text-xs text-slate-400">Medicine</p><p className="text-sm font-semibold text-slate-800">{m.name}</p></div>
                      <div><p className="text-xs text-slate-400">Dosage</p><p className="text-sm text-slate-700">{m.dosage}</p></div>
                      <div><p className="text-xs text-slate-400">Frequency</p><p className="text-sm text-slate-700">{m.frequency}</p></div>
                      <div><p className="text-xs text-slate-400">Duration</p><p className="text-sm text-slate-700">{m.duration}</p></div>
                      <div className="col-span-2"><p className="text-xs text-slate-400">Instructions</p><p className="text-sm text-slate-700">{m.instructions}</p></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 text-sm"><Printer size={14} /> Print</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
