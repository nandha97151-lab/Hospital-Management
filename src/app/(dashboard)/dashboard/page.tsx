'use client'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer,
  XAxis, YAxis, Tooltip, CartesianGrid, Legend
} from 'recharts'
import {
  Users, CalendarDays, UserCog, AlertTriangle, IndianRupee,
  FileX, BedDouble, AlertCircle, TrendingUp, TrendingDown, Activity
} from 'lucide-react'
import {
  stats, patients, appointments, recentTransactions,
  patientChartData, revenueChartData, departmentChartData
} from '@/lib/data'

const COLORS = ['#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444']

const statusBadge = (status: string) => {
  const cls: Record<string, string> = {
    Scheduled: 'badge-scheduled', Confirmed: 'badge-confirmed',
    Completed: 'badge-completed', Cancelled: 'badge-cancelled', 'No Show': 'badge-no-show'
  }
  return `inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${cls[status] || 'bg-slate-100 text-slate-600'}`
}

function StatCard({ icon: Icon, label, value, change, changeType, color }: {
  icon: React.ComponentType<{ className?: string; size?: number }>,
  label: string, value: string | number, change: string,
  changeType: 'up' | 'down', color: string
}) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 stat-card">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 ${color} rounded-xl flex items-center justify-center flex-shrink-0`}>
          <Icon className="text-white" size={20} />
        </div>
        <span className={`flex items-center gap-1 text-xs font-medium ${changeType === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>
          {changeType === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {change}
        </span>
      </div>
      <div className="text-2xl font-bold text-slate-800">{value}</div>
      <div className="text-sm text-slate-500 mt-0.5">{label}</div>
    </div>
  )
}

export default function DashboardPage() {
  const todayAppts = appointments.filter(a => a.status === 'Scheduled' || a.status === 'Confirmed').slice(0, 5)
  const recentPatients = patients.slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-0.5">Welcome back! Here&apos;s what&apos;s happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total Patients" value={stats.totalPatients.toLocaleString()} change="8.2%" changeType="up" color="bg-blue-500" />
        <StatCard icon={CalendarDays} label="Today's Appointments" value={stats.todayAppointments} change="12.5%" changeType="up" color="bg-violet-500" />
        <StatCard icon={UserCog} label="Available Doctors" value={stats.availableDoctors} change="2.1%" changeType="down" color="bg-emerald-500" />
        <StatCard icon={AlertTriangle} label="Emergency Cases" value={stats.emergencyCases} change="3 critical" changeType="down" color="bg-red-500" />
        <StatCard icon={IndianRupee} label="Total Revenue" value={`₹${(stats.totalRevenue / 100000).toFixed(1)}L`} change="18.3%" changeType="up" color="bg-amber-500" />
        <StatCard icon={FileX} label="Pending Bills" value={stats.pendingBills} change="5.4%" changeType="up" color="bg-orange-500" />
        <StatCard icon={BedDouble} label="Available Beds" value={stats.availableBeds} change="14 occupied" changeType="down" color="bg-cyan-500" />
        <StatCard icon={AlertCircle} label="Low Stock Medicines" value={stats.lowStockMedicines} change="Action needed" changeType="down" color="bg-pink-500" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Patient Statistics */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-semibold text-slate-800">Patient Statistics</h2>
              <p className="text-xs text-slate-500">Monthly patient admissions overview</p>
            </div>
            <div className="flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1.5 rounded-lg">
              <Activity size={13} />
              2024
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={patientChartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="patientGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: 12 }} />
              <Area type="monotone" dataKey="patients" stroke="#3b82f6" strokeWidth={2.5} fill="url(#patientGrad)" dot={{ fill: '#3b82f6', strokeWidth: 0, r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Department Distribution */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="mb-4">
            <h2 className="text-base font-semibold text-slate-800">Departments</h2>
            <p className="text-xs text-slate-500">Patient distribution by dept.</p>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={departmentChartData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                {departmentChartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-1.5 mt-2">
            {departmentChartData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: COLORS[i % COLORS.length] }} />
                <span className="text-[10px] text-slate-600 truncate">{d.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-base font-semibold text-slate-800">Revenue Overview</h2>
            <p className="text-xs text-slate-500">Revenue vs Expenses - 2024</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={revenueChartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}K`} />
            <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: 12 }} formatter={(v: number) => [`₹${v.toLocaleString()}`, '']} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="revenue" name="Revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expenses" name="Expenses" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Grid: Recent Patients + Appointments + Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Patients */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-base font-semibold text-slate-800">Recent Patients</h2>
            <a href="/patients" className="text-xs text-blue-600 hover:underline font-medium">View all</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3">Patient</th>
                  <th className="text-left text-xs font-semibold text-slate-500 px-3 py-3">Department</th>
                  <th className="text-left text-xs font-semibold text-slate-500 px-3 py-3">Doctor</th>
                  <th className="text-left text-xs font-semibold text-slate-500 px-3 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentPatients.map(p => (
                  <tr key={p.id} className="table-row-hover border-t border-slate-50">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {p.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-800">{p.name}</p>
                          <p className="text-xs text-slate-400">{p.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-sm text-slate-600">{p.department}</td>
                    <td className="px-3 py-3 text-xs text-slate-500">{p.doctor}</td>
                    <td className="px-3 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        p.status === 'Active' ? 'badge-active' :
                        p.status === 'Admitted' ? 'badge-admitted' : 'badge-discharged'
                      }`}>{p.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Appointments + Transactions */}
        <div className="space-y-4">
          {/* Today's Appointments */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-sm font-semibold text-slate-800">Today&apos;s Appointments</h2>
              <a href="/appointments" className="text-xs text-blue-600 hover:underline">View all</a>
            </div>
            <div className="p-4 space-y-3">
              {todayAppts.slice(0, 3).map(appt => (
                <div key={appt.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0">
                    <CalendarDays size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-800 truncate">{appt.patient}</p>
                    <p className="text-[10px] text-slate-500">{appt.doctor} · {appt.time}</p>
                  </div>
                  <span className={statusBadge(appt.status)}>{appt.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-sm font-semibold text-slate-800">Recent Payments</h2>
              <a href="/billing" className="text-xs text-blue-600 hover:underline">View all</a>
            </div>
            <div className="p-4 space-y-3">
              {recentTransactions.map(tx => (
                <div key={tx.id} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${tx.status === 'Paid' ? 'bg-emerald-100' : 'bg-amber-100'}`}>
                    <IndianRupee size={13} className={tx.status === 'Paid' ? 'text-emerald-600' : 'text-amber-600'} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-slate-800 truncate">{tx.patient}</p>
                    <p className="text-[10px] text-slate-400">{tx.method} · {tx.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-slate-800">₹{tx.amount.toLocaleString()}</p>
                    <span className={`text-[10px] font-medium ${tx.status === 'Paid' ? 'text-emerald-600' : 'text-amber-600'}`}>{tx.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
