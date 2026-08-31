'use client'
import { patients } from '@/lib/data'

export default function MedicalRecordsPage() {
  const patient = patients[0]

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Medical Records</h1>
        <p className="text-slate-500 text-sm">Digital patient medical history and records</p>
      </div>

      {/* Patient selector */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-lg font-bold">
            {patient.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">{patient.name}</h2>
            <p className="text-sm text-slate-500">{patient.id} · {patient.age} yr · {patient.gender} · {patient.bloodGroup}</p>
            <p className="text-sm text-blue-600">{patient.department} — {patient.doctor}</p>
          </div>
          <select className="ml-auto form-input w-auto text-sm">
            {patients.map(p => <option key={p.id}>{p.name}</option>)}
          </select>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
        <h2 className="text-base font-bold text-slate-800 mb-5">Medical History Timeline</h2>
        <div className="relative">
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-slate-100" />
          <div className="space-y-6">
            {[
              { date: '2024-08-31', type: 'Appointment', title: 'Cardiology Consultation', description: 'Regular follow-up for hypertension management. BP: 130/85 mmHg. ECG normal.', doctor: 'Dr. Arun Kumar', color: 'bg-blue-500' },
              { date: '2024-08-20', type: 'Lab Report', title: 'CBC Report Ready', description: 'Hb: 13.5 g/dL, WBC: 7200/mm³, Platelets: 250000/mm³. All within normal range.', doctor: 'Lab - Anand Subramanian', color: 'bg-teal-500' },
              { date: '2024-07-15', type: 'Prescription', title: 'Medication Updated', description: 'Amlodipine 5mg once daily added to regimen. Aspirin 75mg continued.', doctor: 'Dr. Arun Kumar', color: 'bg-violet-500' },
              { date: '2024-06-01', type: 'Admission', title: 'Hospital Admission', description: 'Admitted for chest pain evaluation. Ruled out MI. Stable angina diagnosed.', doctor: 'Dr. Arun Kumar', color: 'bg-amber-500' },
              { date: '2024-01-15', type: 'Registration', title: 'Patient Registered', description: 'New patient registration. Primary concern: hypertension and occasional chest discomfort.', doctor: 'Admin', color: 'bg-emerald-500' },
            ].map((event, idx) => (
              <div key={idx} className="relative pl-14">
                <div className={`absolute left-3 w-5 h-5 ${event.color} rounded-full border-2 border-white shadow flex items-center justify-center`}>
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                </div>
                <div className="bg-slate-50 rounded-xl p-4 hover:bg-slate-100 transition-colors">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${event.color} text-white`}>{event.type}</span>
                      <h3 className="font-semibold text-slate-800 mt-1.5">{event.title}</h3>
                    </div>
                    <span className="text-xs text-slate-400 whitespace-nowrap ml-3">{event.date}</span>
                  </div>
                  <p className="text-sm text-slate-600">{event.description}</p>
                  <p className="text-xs text-slate-400 mt-1.5">By: {event.doctor}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
