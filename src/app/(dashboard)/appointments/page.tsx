'use client'
import { useState } from 'react'
import { appointments } from '@/lib/data'
import { Search, Plus, Filter, Calendar, ChevronLeft, ChevronRight } from 'lucide-react'

const statusConfig: Record<string, { cls: string }> = {
  Scheduled: { cls: 'badge-scheduled' },
  Confirmed: { cls: 'badge-confirmed' },
  Completed: { cls: 'badge-completed' },
  Cancelled: { cls: 'badge-cancelled' },
  'No Show': { cls: 'badge-no-show' },
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export default function AppointmentsPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [view, setView] = useState<'list' | 'calendar'>('list')
  const [showModal, setShowModal] = useState(false)
  const [calendarDate, setCalendarDate] = useState(new Date())

  const filtered = appointments.filter(a => {
    const matchSearch = a.patient.toLowerCase().includes(search.toLowerCase()) ||
      a.doctor.toLowerCase().includes(search.toLowerCase()) ||
      a.id.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'All' || a.status === statusFilter
    return matchSearch && matchStatus
  })

  // Calendar helpers
  const year = calendarDate.getFullYear()
  const month = calendarDate.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const apptsByDay: Record<number, typeof appointments> = {}
  appointments.forEach(a => {
    const d = new Date(a.date)
    if (d.getFullYear() === year && d.getMonth() === month) {
      const day = d.getDate()
      if (!apptsByDay[day]) apptsByDay[day] = []
      apptsByDay[day].push(a)
    }
  })

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Appointments</h1>
          <p className="text-slate-500 text-sm">Schedule and manage patient appointments</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-100 rounded-xl p-0.5">
            <button onClick={() => setView('list')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${view === 'list' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}>List</button>
            <button onClick={() => setView('calendar')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${view === 'calendar' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}>Calendar</button>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 text-sm font-medium transition-colors shadow-lg shadow-blue-500/20"
          >
            <Plus size={15} /> Book Appointment
          </button>
        </div>
      </div>

      {view === 'list' ? (
        <>
          {/* Filters */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by patient, doctor, ID..." className="form-input pl-9" />
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <Filter size={14} className="text-slate-400" />
              {['All', 'Scheduled', 'Confirmed', 'Completed', 'Cancelled', 'No Show'].map(s => (
                <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${statusFilter === s ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{s}</button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    {['Appointment ID', 'Patient', 'Doctor', 'Department', 'Date & Time', 'Reason', 'Status', 'Actions'].map(h => (
                      <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3.5">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(appt => (
                    <tr key={appt.id} className="table-row-hover border-t border-slate-50">
                      <td className="px-4 py-3.5"><span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-1 rounded-lg">{appt.id}</span></td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs font-bold">
                            {appt.patient.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </div>
                          <span className="text-sm font-medium text-slate-800">{appt.patient}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-sm text-slate-600">{appt.doctor}</td>
                      <td className="px-4 py-3.5 text-sm text-slate-500">{appt.department}</td>
                      <td className="px-4 py-3.5">
                        <p className="text-sm font-medium text-slate-800">{appt.date}</p>
                        <p className="text-xs text-slate-400">{appt.time}</p>
                      </td>
                      <td className="px-4 py-3.5 text-sm text-slate-500 max-w-32 truncate">{appt.reason}</td>
                      <td className="px-4 py-3.5">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig[appt.status]?.cls || 'bg-slate-100 text-slate-600'}`}>
                          {appt.status}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex gap-1">
                          <button className="px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">Edit</button>
                          <button className="px-2 py-1 text-xs bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">Cancel</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        /* Calendar View */
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-slate-800">{MONTHS[month]} {year}</h2>
            <div className="flex items-center gap-1">
              <button onClick={() => setCalendarDate(new Date(year, month - 1, 1))} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"><ChevronLeft size={18} /></button>
              <button onClick={() => setCalendarDate(new Date())} className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-xs font-medium hover:bg-blue-100 transition-colors">Today</button>
              <button onClick={() => setCalendarDate(new Date(year, month + 1, 1))} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"><ChevronRight size={18} /></button>
            </div>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 mb-2">
            {DAYS.map(d => (
              <div key={d} className="text-center text-xs font-semibold text-slate-400 py-2">{d}</div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
              const appts = apptsByDay[day] || []
              const isToday = new Date().getDate() === day && new Date().getMonth() === month && new Date().getFullYear() === year
              return (
                <div
                  key={day}
                  className={`min-h-20 p-1.5 rounded-xl border text-xs transition-colors cursor-pointer hover:bg-slate-50 ${isToday ? 'border-blue-400 bg-blue-50' : 'border-slate-100'}`}
                >
                  <span className={`inline-flex w-6 h-6 items-center justify-center rounded-full font-semibold mb-1 ${isToday ? 'bg-blue-600 text-white' : 'text-slate-700'}`}>{day}</span>
                  {appts.slice(0, 2).map(a => (
                    <div key={a.id} className={`truncate rounded-md px-1.5 py-0.5 mb-0.5 text-[10px] font-medium ${statusConfig[a.status]?.cls || 'bg-slate-100 text-slate-600'}`}>
                      {a.patient}
                    </div>
                  ))}
                  {appts.length > 2 && <div className="text-[10px] text-slate-400 px-1">+{appts.length - 2} more</div>}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Book Appointment Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-fade-in" onClick={e => e.stopPropagation()}>
            <div className="p-5 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-800">Book Appointment</h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500">✕</button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs font-medium text-slate-700 mb-1.5">Patient *</label><select className="form-input"><option>Rajesh Khanna</option><option>Anita Desai</option><option>Arjun Mehta</option></select></div>
                <div><label className="block text-xs font-medium text-slate-700 mb-1.5">Doctor *</label><select className="form-input"><option>Dr. Arun Kumar</option><option>Dr. Priya Sharma</option><option>Dr. Ravi Kumar</option></select></div>
                <div><label className="block text-xs font-medium text-slate-700 mb-1.5">Department *</label><select className="form-input"><option>Cardiology</option><option>Neurology</option><option>Pediatrics</option></select></div>
                <div><label className="block text-xs font-medium text-slate-700 mb-1.5">Date *</label><input type="date" className="form-input" /></div>
                <div><label className="block text-xs font-medium text-slate-700 mb-1.5">Time *</label>
                  <select className="form-input">
                    {['09:00 AM','09:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM','02:00 PM','02:30 PM','03:00 PM'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div><label className="block text-xs font-medium text-slate-700 mb-1.5">Status</label><select className="form-input"><option>Scheduled</option><option>Confirmed</option></select></div>
              </div>
              <div><label className="block text-xs font-medium text-slate-700 mb-1.5">Reason for Visit *</label><input className="form-input" placeholder="Describe the reason..." /></div>
              <div><label className="block text-xs font-medium text-slate-700 mb-1.5">Notes</label><textarea className="form-input resize-none" rows={2} placeholder="Additional notes..." /></div>
            </div>
            <div className="px-5 pb-5 flex gap-3 justify-end">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 text-sm">Cancel</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 text-sm font-medium shadow-lg shadow-blue-500/20">Book Appointment</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
