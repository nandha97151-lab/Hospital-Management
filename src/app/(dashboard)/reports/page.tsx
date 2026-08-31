'use client'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { Download, Printer } from 'lucide-react'
import { patientChartData, revenueChartData } from '@/lib/data'

const reports = [
  { name: 'Patient Report', description: 'Total patient registrations and demographics', records: '1,248', period: 'Jan–Aug 2024' },
  { name: 'Appointment Report', description: 'Appointment statistics and completion rates', records: '3,847', period: 'Jan–Aug 2024' },
  { name: 'Revenue Report', description: 'Financial summary and revenue breakdown', records: '₹28.5L', period: 'Jan–Aug 2024' },
  { name: 'Billing Report', description: 'Invoice status and payment collection', records: '2,156', period: 'Jan–Aug 2024' },
  { name: 'Pharmacy Report', description: 'Medicine stock and dispensing summary', records: '8 items', period: 'Current Stock' },
  { name: 'Laboratory Report', description: 'Lab test requests and results', records: '6 tests', period: 'Aug 2024' },
  { name: 'Bed Occupancy Report', description: 'Bed utilization and ward statistics', records: '15 beds', period: 'Current' },
  { name: 'Doctor Report', description: 'Doctor performance and patient load', records: '8 doctors', period: 'Jan–Aug 2024' },
]

export default function ReportsPage() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Reports</h1>
          <p className="text-slate-500 text-sm">Comprehensive analytics and hospital performance reports</p>
        </div>
        <div className="flex gap-2">
          <input type="date" className="form-input text-sm w-auto" defaultValue="2024-08-01" />
          <input type="date" className="form-input text-sm w-auto" defaultValue="2024-08-31" />
        </div>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {reports.map(report => (
          <div key={report.name} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 stat-card">
            <h3 className="font-semibold text-slate-800 text-sm">{report.name}</h3>
            <p className="text-xs text-slate-400 mt-0.5 mb-3">{report.description}</p>
            <div className="text-xl font-bold text-blue-600 mb-0.5">{report.records}</div>
            <p className="text-xs text-slate-400 mb-3">{report.period}</p>
            <div className="flex gap-1.5">
              <button className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors">
                <Download size={11} /> Export
              </button>
              <button className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs hover:bg-slate-200 transition-colors">
                <Printer size={11} /> Print
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
          <h2 className="text-base font-semibold text-slate-800 mb-4">Monthly Patient Trend</h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={patientChartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: 12 }} />
              <Line type="monotone" dataKey="patients" stroke="#3b82f6" strokeWidth={2.5} dot={{ fill: '#3b82f6', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
          <h2 className="text-base font-semibold text-slate-800 mb-4">Revenue vs Expenses</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={revenueChartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v/1000}K`} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: 12 }} formatter={(v: number) => [`₹${v.toLocaleString()}`, '']} />
              <Bar dataKey="revenue" name="Revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" name="Expenses" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
