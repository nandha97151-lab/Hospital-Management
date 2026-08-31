'use client'
import { medicines } from '@/lib/data'
import { Search, Plus, AlertTriangle, Package, Edit2, Trash2, Filter } from 'lucide-react'
import { useState } from 'react'

const statusMap: Record<string, { cls: string; icon: string }> = {
  'In Stock': { cls: 'badge-in-stock', icon: '✓' },
  'Low Stock': { cls: 'badge-low-stock', icon: '⚠' },
  'Out of Stock': { cls: 'badge-out-of-stock', icon: '✗' },
  'Expiring Soon': { cls: 'badge-expiring-soon', icon: '⏰' },
}

export default function PharmacyPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [showModal, setShowModal] = useState(false)

  const filtered = medicines.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.batchNumber.toLowerCase().includes(search.toLowerCase()) ||
      m.supplier.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'All' || m.status === statusFilter
    return matchSearch && matchStatus
  })

  const lowStock = medicines.filter(m => m.status === 'Low Stock').length
  const outOfStock = medicines.filter(m => m.status === 'Out of Stock').length
  const expiringSoon = medicines.filter(m => m.status === 'Expiring Soon').length

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Pharmacy</h1>
          <p className="text-slate-500 text-sm">Manage medicine inventory and stock</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 text-sm font-medium transition-colors shadow-lg shadow-blue-500/20 w-fit">
          <Plus size={15} /> Add Medicine
        </button>
      </div>

      {/* Alert Cards */}
      {(lowStock > 0 || outOfStock > 0 || expiringSoon > 0) && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {lowStock > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center"><AlertTriangle size={18} className="text-amber-600" /></div>
              <div><p className="font-semibold text-amber-800 text-sm">Low Stock</p><p className="text-xs text-amber-600">{lowStock} medicines running low</p></div>
            </div>
          )}
          {outOfStock > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center"><Package size={18} className="text-red-600" /></div>
              <div><p className="font-semibold text-red-800 text-sm">Out of Stock</p><p className="text-xs text-red-600">{outOfStock} medicines unavailable</p></div>
            </div>
          )}
          {expiringSoon > 0 && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center"><AlertTriangle size={18} className="text-orange-600" /></div>
              <div><p className="font-semibold text-orange-800 text-sm">Expiring Soon</p><p className="text-xs text-orange-600">{expiringSoon} medicines near expiry</p></div>
            </div>
          )}
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search medicines..." className="form-input pl-9" />
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <Filter size={14} className="text-slate-400" />
          {['All', 'In Stock', 'Low Stock', 'Out of Stock', 'Expiring Soon'].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${statusFilter === s ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{s}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {['Medicine Name', 'Category', 'Stock', 'Price', 'Expiry Date', 'Batch No.', 'Supplier', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(med => (
                <tr key={med.id} className="table-row-hover border-t border-slate-50">
                  <td className="px-4 py-3.5">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{med.name}</p>
                      <p className="text-xs text-slate-400">{med.id}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3.5"><span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg">{med.category}</span></td>
                  <td className="px-4 py-3.5">
                    <span className={`text-sm font-bold ${med.stock === 0 ? 'text-red-600' : med.stock < 20 ? 'text-amber-600' : 'text-slate-800'}`}>
                      {med.stock}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-sm font-medium text-slate-700">₹{med.price.toFixed(2)}</td>
                  <td className="px-4 py-3.5 text-sm text-slate-600">{med.expiryDate}</td>
                  <td className="px-4 py-3.5"><span className="text-xs font-mono text-slate-500">{med.batchNumber}</span></td>
                  <td className="px-4 py-3.5 text-sm text-slate-600">{med.supplier}</td>
                  <td className="px-4 py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusMap[med.status]?.cls || 'bg-slate-100 text-slate-600'}`}>
                      {statusMap[med.status]?.icon} {med.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1">
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

      {/* Add Medicine Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-fade-in" onClick={e => e.stopPropagation()}>
            <div className="p-5 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-800">Add New Medicine</h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500">✕</button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2"><label className="block text-xs font-medium text-slate-700 mb-1.5">Medicine Name *</label><input className="form-input" placeholder="e.g. Paracetamol 500mg" /></div>
                <div><label className="block text-xs font-medium text-slate-700 mb-1.5">Category *</label><select className="form-input"><option>Analgesic</option><option>Antibiotic</option><option>Antidiabetic</option><option>Antihypertensive</option><option>Antacid</option></select></div>
                <div><label className="block text-xs font-medium text-slate-700 mb-1.5">Stock Quantity *</label><input type="number" className="form-input" placeholder="0" /></div>
                <div><label className="block text-xs font-medium text-slate-700 mb-1.5">Price per unit (₹) *</label><input type="number" step="0.01" className="form-input" placeholder="0.00" /></div>
                <div><label className="block text-xs font-medium text-slate-700 mb-1.5">Expiry Date *</label><input type="date" className="form-input" /></div>
                <div><label className="block text-xs font-medium text-slate-700 mb-1.5">Batch Number *</label><input className="form-input" placeholder="BATCH-XXX" /></div>
                <div><label className="block text-xs font-medium text-slate-700 mb-1.5">Supplier *</label><input className="form-input" placeholder="Supplier name" /></div>
              </div>
            </div>
            <div className="px-5 pb-5 flex gap-3 justify-end">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 text-sm">Cancel</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 text-sm font-medium">Add Medicine</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
