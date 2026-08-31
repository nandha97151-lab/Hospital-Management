'use client'
import { labTests } from '@/lib/data'
import { Search, Plus, Filter, FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import { useState } from 'react'

const statusCfg: Record<string, { cls: string; icon: React.ComponentType<{ size?: number }> }> = {
  Pending: { cls: 'badge-pending', icon: Clock },
  Processing: { cls: 'badge-processing', icon: AlertCircle },
  Completed: { cls: 'badge-completed', icon: CheckCircle },
}

export default function LaboratoryPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const filtered = labTests.filter(t => {
    const matchSearch = t.patient.toLowerCase().includes(search.toLowerCase()) ||
      t.testName.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'All' || t.status === statusFilter
    return matchSearch && matchStatus
  })

  const pending = labTests.filter(t => t.status === 'Pending').length
  const processing = labTests.filter(t => t.status === 'Processing').length
  const completed = labTests.filter(t => t.status === 'Completed').length

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Laboratory</h1>
          <p className="text-slate-500 text-sm">Manage lab tests, requests and reports</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 text-sm font-medium shadow-lg shadow-blue-500/20 w-fit">
          <Plus size={15} /> New Test Request
        </button>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <Clock size={18} className="text-amber-600" />
            <span className="text-amber-700 font-semibold text-sm">Pending</span>
          </div>
          <div className="text-3xl font-bold text-amber-700">{pending}</div>
          <div className="text-xs text-amber-500 mt-1">Awaiting processing</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle size={18} className="text-blue-600" />
            <span className="text-blue-700 font-semibold text-sm">Processing</span>
          </div>
          <div className="text-3xl font-bold text-blue-700">{processing}</div>
          <div className="text-xs text-blue-500 mt-1">In progress</div>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle size={18} className="text-emerald-600" />
            <span className="text-emerald-700 font-semibold text-sm">Completed</span>
          </div>
          <div className="text-3xl font-bold text-emerald-700">{completed}</div>
          <div className="text-xs text-emerald-500 mt-1">Reports ready</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by patient, test name..." className="form-input pl-9" />
        </div>
        <div className="flex items-center gap-1.5">
          <Filter size={14} className="text-slate-400" />
          {['All', 'Pending', 'Processing', 'Completed'].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${statusFilter === s ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{s}</button>
          ))}
        </div>
      </div>

      {/* Tests Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {['Test ID', 'Patient', 'Test Name', 'Requested By', 'Date', 'Status', 'Result', 'Actions'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(test => {
                const StatusIcon = statusCfg[test.status]?.icon || Clock
                return (
                  <tr key={test.id} className="table-row-hover border-t border-slate-50">
                    <td className="px-4 py-3.5"><span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-1 rounded-lg">{test.id}</span></td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 text-xs font-bold">{test.patient.split(' ').map(n => n[0]).join('').slice(0, 2)}</div>
                        <div>
                          <p className="text-sm font-medium text-slate-800">{test.patient}</p>
                          <p className="text-xs text-slate-400">{test.patientId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-sm font-medium text-slate-800">{test.testName}</td>
                    <td className="px-4 py-3.5 text-sm text-slate-500">{test.requestedBy}</td>
                    <td className="px-4 py-3.5 text-sm text-slate-600">{test.date}</td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${statusCfg[test.status]?.cls}`}>
                        <StatusIcon size={10} />
                        {test.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      {test.result ? (
                        <span className="text-xs text-slate-600 max-w-32 truncate block" title={test.result}>{test.result}</span>
                      ) : (
                        <span className="text-xs text-slate-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex gap-1">
                        {test.status === 'Completed' && (
                          <button className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                            <FileText size={11} /> Report
                          </button>
                        )}
                        {test.status === 'Pending' && (
                          <button className="px-2 py-1 text-xs bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-colors">Start</button>
                        )}
                        {test.status === 'Processing' && (
                          <button className="px-2 py-1 text-xs bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors">Complete</button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
