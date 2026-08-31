'use client'
import { beds } from '@/lib/data'
import { BedDouble } from 'lucide-react'

const statusConfig: Record<string, { bg: string; text: string; dot: string; cls: string }> = {
  Available: { bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-700', dot: 'bg-emerald-500', cls: 'badge-available' },
  Occupied: { bg: 'bg-red-50 border-red-200', text: 'text-red-700', dot: 'bg-red-500', cls: 'badge-occupied' },
  Reserved: { bg: 'bg-amber-50 border-amber-200', text: 'text-amber-700', dot: 'bg-amber-500', cls: 'badge-reserved' },
  Maintenance: { bg: 'bg-slate-100 border-slate-200', text: 'text-slate-500', dot: 'bg-slate-400', cls: 'badge-maintenance' },
}

const wards = ['Ward A', 'Ward B', 'ICU', 'Emergency']

export default function BedsPage() {
  const total = beds.length
  const available = beds.filter(b => b.status === 'Available').length
  const occupied = beds.filter(b => b.status === 'Occupied').length
  const reserved = beds.filter(b => b.status === 'Reserved').length
  const icu = beds.filter(b => b.type === 'ICU').length
  const emergency = beds.filter(b => b.type === 'Emergency').length

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Beds & Rooms</h1>
        <p className="text-slate-500 text-sm">Monitor and manage hospital bed occupancy</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: 'Total Beds', value: total, cls: 'bg-slate-700 text-white' },
          { label: 'Available', value: available, cls: 'bg-emerald-500 text-white' },
          { label: 'Occupied', value: occupied, cls: 'bg-red-500 text-white' },
          { label: 'Reserved', value: reserved, cls: 'bg-amber-500 text-white' },
          { label: 'ICU Beds', value: icu, cls: 'bg-blue-600 text-white' },
          { label: 'Emergency', value: emergency, cls: 'bg-purple-600 text-white' },
        ].map(card => (
          <div key={card.label} className={`${card.cls} rounded-2xl p-4 text-center shadow-sm`}>
            <div className="text-2xl font-bold">{card.value}</div>
            <div className="text-xs opacity-80 mt-0.5">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 bg-white rounded-xl p-4 shadow-sm border border-slate-100">
        <span className="text-xs font-semibold text-slate-600">Legend:</span>
        {Object.entries(statusConfig).map(([status, cfg]) => (
          <div key={status} className="flex items-center gap-1.5">
            <div className={`w-3 h-3 rounded ${cfg.dot}`} />
            <span className="text-xs text-slate-600">{status}</span>
          </div>
        ))}
      </div>

      {/* Bed Layout by Ward */}
      {wards.map(ward => {
        const wardBeds = beds.filter(b => b.ward === ward)
        if (wardBeds.length === 0) return null
        return (
          <div key={ward} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <h2 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
              <BedDouble size={18} className="text-blue-600" />
              {ward}
              <span className="text-xs text-slate-400 font-normal">({wardBeds.filter(b => b.status === 'Available').length} available)</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {wardBeds.map(bed => {
                const cfg = statusConfig[bed.status]
                return (
                  <div
                    key={bed.id}
                    className={`border-2 rounded-xl p-3 cursor-pointer transition-all hover:scale-105 ${cfg.bg}`}
                    title={bed.patient ? `Patient: ${bed.patient}` : bed.status}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-700 font-mono">{bed.id}</span>
                      <div className={`w-2.5 h-2.5 rounded-full ${cfg.dot}`} />
                    </div>
                    <BedDouble size={20} className={`${cfg.text} mb-1.5`} />
                    <p className={`text-[10px] font-semibold ${cfg.text}`}>{bed.status}</p>
                    {bed.patient && (
                      <p className="text-[9px] text-slate-500 truncate mt-0.5">{bed.patient}</p>
                    )}
                    <p className="text-[9px] text-slate-400">{bed.type}</p>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
