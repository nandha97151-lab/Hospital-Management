'use client'
import { useState } from 'react'
import { invoices } from '@/lib/data'
import { Search, Plus, Filter, Printer, Download, IndianRupee } from 'lucide-react'

const statusCls: Record<string, string> = {
  Paid: 'badge-paid', Partial: 'badge-partial', Unpaid: 'badge-unpaid'
}

export default function BillingPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedInvoice, setSelectedInvoice] = useState<typeof invoices[0] | null>(null)
  const [showNewModal, setShowNewModal] = useState(false)

  const filtered = invoices.filter(inv => {
    const matchSearch = inv.patient.toLowerCase().includes(search.toLowerCase()) || inv.id.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'All' || inv.status === statusFilter
    return matchSearch && matchStatus
  })

  const totalRevenue = invoices.reduce((s, inv) => s + inv.amountPaid, 0)
  const totalPending = invoices.reduce((s, inv) => s + inv.balanceDue, 0)

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Billing & Payments</h1>
          <p className="text-slate-500 text-sm">Manage invoices, payments and financial records</p>
        </div>
        <button onClick={() => setShowNewModal(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 text-sm font-medium shadow-lg shadow-blue-500/20 w-fit">
          <Plus size={15} /> New Invoice
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Invoices', value: invoices.length, color: 'bg-blue-500', icon: '📄' },
          { label: 'Total Collected', value: `₹${totalRevenue.toLocaleString()}`, color: 'bg-emerald-500', icon: '💰' },
          { label: 'Pending Amount', value: `₹${totalPending.toLocaleString()}`, color: 'bg-amber-500', icon: '⏳' },
          { label: 'Unpaid Invoices', value: invoices.filter(i => i.status === 'Unpaid').length, color: 'bg-red-500', icon: '❌' },
        ].map(card => (
          <div key={card.label} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 stat-card">
            <div className={`w-10 h-10 ${card.color} rounded-xl flex items-center justify-center text-lg mb-3`}>{card.icon}</div>
            <div className="text-xl font-bold text-slate-800">{card.value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by patient name or invoice ID..." className="form-input pl-9" />
        </div>
        <div className="flex items-center gap-1.5">
          <Filter size={14} className="text-slate-400" />
          {['All', 'Paid', 'Partial', 'Unpaid'].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${statusFilter === s ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{s}</button>
          ))}
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {['Invoice', 'Patient', 'Date', 'Total', 'Paid', 'Balance', 'Payment Method', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(inv => (
                <tr key={inv.id} className="table-row-hover border-t border-slate-50">
                  <td className="px-4 py-3.5"><span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-1 rounded-lg">{inv.id}</span></td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs font-bold">{inv.patient.split(' ').map(n => n[0]).join('').slice(0, 2)}</div>
                      <span className="text-sm font-medium text-slate-800">{inv.patient}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-slate-600">{inv.date}</td>
                  <td className="px-4 py-3.5 text-sm font-semibold text-slate-800">₹{inv.totalAmount.toLocaleString()}</td>
                  <td className="px-4 py-3.5 text-sm text-emerald-600 font-medium">₹{inv.amountPaid.toLocaleString()}</td>
                  <td className="px-4 py-3.5 text-sm font-medium text-red-500">₹{inv.balanceDue.toLocaleString()}</td>
                  <td className="px-4 py-3.5 text-sm text-slate-500">{inv.paymentMethod || '—'}</td>
                  <td className="px-4 py-3.5"><span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusCls[inv.status]}`}>{inv.status}</span></td>
                  <td className="px-4 py-3.5">
                    <div className="flex gap-1">
                      <button onClick={() => setSelectedInvoice(inv)} className="px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">View</button>
                      <button className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"><Printer size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Detail Modal */}
      {selectedInvoice && (
        <div className="modal-overlay" onClick={() => setSelectedInvoice(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl animate-fade-in overflow-hidden" onClick={e => e.stopPropagation()}>
            {/* Invoice Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold">MediCare Hospital</h2>
                  <p className="text-blue-200 text-sm">123 Healthcare Ave, Chennai - 600001</p>
                  <p className="text-blue-200 text-sm">Tel: 044-12345678</p>
                </div>
                <button onClick={() => setSelectedInvoice(null)} className="text-white/70 hover:text-white">✕</button>
              </div>
              <div className="flex justify-between mt-4">
                <div>
                  <p className="text-blue-200 text-xs">Invoice Number</p>
                  <p className="font-bold text-lg font-mono">{selectedInvoice.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-blue-200 text-xs">Date</p>
                  <p className="font-semibold">{selectedInvoice.date}</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {/* Patient Info */}
              <div className="flex justify-between bg-slate-50 rounded-xl p-4">
                <div>
                  <p className="text-xs text-slate-400">Patient Name</p>
                  <p className="font-semibold text-slate-800">{selectedInvoice.patient}</p>
                  <p className="text-xs text-slate-500">{selectedInvoice.patientId}</p>
                </div>
                <span className={`self-start px-2.5 py-1 rounded-full text-xs font-medium ${statusCls[selectedInvoice.status]}`}>{selectedInvoice.status}</span>
              </div>

              {/* Services Table */}
              <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-2">Services</h3>
                <div className="border border-slate-100 rounded-xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead><tr className="bg-slate-50"><th className="text-left px-4 py-2 text-xs text-slate-500">Service</th><th className="text-center px-4 py-2 text-xs text-slate-500">Qty</th><th className="text-right px-4 py-2 text-xs text-slate-500">Price</th><th className="text-right px-4 py-2 text-xs text-slate-500">Total</th></tr></thead>
                    <tbody>
                      {selectedInvoice.services.map((s, i) => (
                        <tr key={i} className="border-t border-slate-100">
                          <td className="px-4 py-2.5 text-slate-800">{s.name}</td>
                          <td className="px-4 py-2.5 text-center text-slate-600">{s.qty}</td>
                          <td className="px-4 py-2.5 text-right text-slate-600">₹{s.price.toLocaleString()}</td>
                          <td className="px-4 py-2.5 text-right font-medium text-slate-800">₹{(s.qty * s.price).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Totals */}
              <div className="bg-slate-50 rounded-xl p-4 space-y-2">
                {[
                  { label: 'Subtotal', value: selectedInvoice.subtotal },
                  { label: 'Discount', value: -selectedInvoice.discount },
                  { label: 'Tax', value: selectedInvoice.tax },
                ].map(row => (
                  <div key={row.label} className="flex justify-between text-sm text-slate-600">
                    <span>{row.label}</span>
                    <span className={row.value < 0 ? 'text-emerald-600' : ''}>₹{Math.abs(row.value).toLocaleString()}</span>
                  </div>
                ))}
                <div className="border-t border-slate-200 pt-2 flex justify-between font-bold text-slate-800">
                  <span>Total Amount</span>
                  <span>₹{selectedInvoice.totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-emerald-600 font-medium">
                  <span>Amount Paid</span>
                  <span>₹{selectedInvoice.amountPaid.toLocaleString()}</span>
                </div>
                {selectedInvoice.balanceDue > 0 && (
                  <div className="flex justify-between text-sm text-red-600 font-medium">
                    <span>Balance Due</span>
                    <span>₹{selectedInvoice.balanceDue.toLocaleString()}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 text-sm transition-colors">
                  <Printer size={14} /> Print
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 text-sm transition-colors">
                  <Download size={14} /> Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
