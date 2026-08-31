'use client'
import { patients } from '@/lib/data'
import { Plus, Search } from 'lucide-react'
import { useState } from 'react'

export default function AdmissionsPage() {
  const [showModal, setShowModal] = useState(false)

  const admitted = patients.filter(p => p.status === 'Admitted')

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Admissions</h1>
          <p className="text-slate-500 text-sm">Manage patient admissions and discharges</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 text-sm font-medium shadow-lg shadow-blue-500/20">
          <Plus size={15} /> New Admission
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Currently Admitted', value: admitted.length, cls: 'bg-blue-600 text-white' },
          { label: 'Discharged Today', value: 3, cls: 'bg-emerald-600 text-white' },
          { label: 'Pending Discharge', value: 2, cls: 'bg-amber-500 text-white' },
        ].map(c => (
          <div key={c.label} className={`${c.cls} rounded-2xl p-5 shadow-sm`}>
            <div className="text-3xl font-bold">{c.value}</div>
            <div className="text-sm opacity-80 mt-1">{c.label}</div>
          </div>
        ))}
      </div>

      {/* Admitted Patients */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-800">Currently Admitted Patients</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {['Patient', 'Department', 'Doctor', 'Bed', 'Admission Date', 'Diagnosis', 'Actions'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {admitted.map(p => (
                <tr key={p.id} className="table-row-hover border-t border-slate-50">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                        {p.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{p.name}</p>
                        <p className="text-xs text-slate-400">{p.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-slate-600">{p.department}</td>
                  <td className="px-4 py-3.5 text-sm text-slate-500">{p.doctor}</td>
                  <td className="px-4 py-3.5"><span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-1 rounded-lg">GEN-01</span></td>
                  <td className="px-4 py-3.5 text-sm text-slate-600">{p.lastVisit}</td>
                  <td className="px-4 py-3.5 text-sm text-slate-600">{p.diagnosis}</td>
                  <td className="px-4 py-3.5">
                    <button className="px-3 py-1.5 bg-emerald-50 text-emerald-600 text-xs font-medium rounded-lg hover:bg-emerald-100 transition-colors">Discharge</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Admission Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-fade-in" onClick={e => e.stopPropagation()}>
            <div className="p-5 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-800">New Patient Admission</h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500">✕</button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs font-medium text-slate-700 mb-1.5">Patient *</label><select className="form-input"><option>Rajesh Khanna</option><option>Anita Desai</option></select></div>
                <div><label className="block text-xs font-medium text-slate-700 mb-1.5">Doctor *</label><select className="form-input"><option>Dr. Arun Kumar</option><option>Dr. Priya Sharma</option></select></div>
                <div><label className="block text-xs font-medium text-slate-700 mb-1.5">Department *</label><select className="form-input"><option>Cardiology</option><option>Neurology</option></select></div>
                <div><label className="block text-xs font-medium text-slate-700 mb-1.5">Room/Bed *</label><select className="form-input"><option>GEN-02 (Ward A)</option><option>GEN-07 (Ward B)</option><option>ICU-03</option></select></div>
                <div><label className="block text-xs font-medium text-slate-700 mb-1.5">Admission Date *</label><input type="date" className="form-input" /></div>
                <div><label className="block text-xs font-medium text-slate-700 mb-1.5">Expected Duration</label><input className="form-input" placeholder="e.g. 3 days" /></div>
              </div>
              <div><label className="block text-xs font-medium text-slate-700 mb-1.5">Reason for Admission *</label><textarea className="form-input resize-none" rows={2} placeholder="Describe reason..." /></div>
              <div><label className="block text-xs font-medium text-slate-700 mb-1.5">Preliminary Diagnosis</label><input className="form-input" placeholder="Initial diagnosis..." /></div>
            </div>
            <div className="px-5 pb-5 flex gap-3 justify-end">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 text-sm">Cancel</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 text-sm font-medium">Admit Patient</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
