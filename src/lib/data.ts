// Mock data for the Hospital Management System

export const stats = {
  totalPatients: 1248,
  todayAppointments: 47,
  availableDoctors: 28,
  emergencyCases: 5,
  totalRevenue: 2847500,
  pendingBills: 89,
  availableBeds: 42,
  lowStockMedicines: 12,
}

export const patients = [
  { id: "PT-1001", name: "Rajesh Khanna", age: 45, gender: "Male", bloodGroup: "O+", phone: "9876543210", email: "rajesh@example.com", address: "123 Main St, Chennai", dateOfBirth: "1980-05-15", emergencyContact: "9876543211", registrationDate: "2024-01-15", status: "Active", lastVisit: "2024-08-20", doctor: "Dr. Arun Kumar", department: "Cardiology", diagnosis: "Hypertension" },
  { id: "PT-1002", name: "Anita Desai", age: 32, gender: "Female", bloodGroup: "A+", phone: "9876543222", email: "anita@example.com", address: "456 Park Ave, Mumbai", dateOfBirth: "1992-08-22", emergencyContact: "9876543233", registrationDate: "2024-02-10", status: "Active", lastVisit: "2024-08-25", doctor: "Dr. Priya Sharma", department: "Neurology", diagnosis: "Migraine" },
  { id: "PT-1003", name: "Mohammed Ibrahim", age: 58, gender: "Male", bloodGroup: "B+", phone: "9876543244", email: "ibrahim@example.com", address: "789 Oak Lane, Delhi", dateOfBirth: "1966-11-03", emergencyContact: "9876543255", registrationDate: "2024-01-28", status: "Admitted", lastVisit: "2024-08-28", doctor: "Dr. Arun Kumar", department: "Cardiology", diagnosis: "Coronary Artery Disease" },
  { id: "PT-1004", name: "Sunita Rao", age: 27, gender: "Female", bloodGroup: "AB+", phone: "9876543266", email: "sunita@example.com", address: "321 Elm St, Bangalore", dateOfBirth: "1997-03-14", emergencyContact: "9876543277", registrationDate: "2024-03-05", status: "Active", lastVisit: "2024-08-15", doctor: "Dr. Kavya Nair", department: "Gynecology", diagnosis: "PCOS" },
  { id: "PT-1005", name: "Arjun Mehta", age: 12, gender: "Male", bloodGroup: "O-", phone: "9876543288", email: "arjun@example.com", address: "654 Pine Ave, Pune", dateOfBirth: "2012-07-20", emergencyContact: "9876543299", registrationDate: "2024-04-12", status: "Active", lastVisit: "2024-08-22", doctor: "Dr. Ravi Kumar", department: "Pediatrics", diagnosis: "Asthma" },
  { id: "PT-1006", name: "Lakshmi Devi", age: 65, gender: "Female", bloodGroup: "A-", phone: "9876543300", email: "lakshmi@example.com", address: "987 River Rd, Hyderabad", dateOfBirth: "1959-12-01", emergencyContact: "9876543311", registrationDate: "2024-02-20", status: "Discharged", lastVisit: "2024-08-10", doctor: "Dr. Priya Sharma", department: "Neurology", diagnosis: "Stroke (Recovered)" },
  { id: "PT-1007", name: "Karthik Suresh", age: 38, gender: "Male", bloodGroup: "B-", phone: "9876543322", email: "karthik@example.com", address: "147 Lotus St, Coimbatore", dateOfBirth: "1986-09-30", emergencyContact: "9876543333", registrationDate: "2024-05-08", status: "Active", lastVisit: "2024-08-29", doctor: "Dr. Sanjay Patel", department: "Orthopedics", diagnosis: "Lumbar Disc Herniation" },
  { id: "PT-1008", name: "Meena Krishnan", age: 50, gender: "Female", bloodGroup: "O+", phone: "9876543344", email: "meena@example.com", address: "258 Green Blvd, Chennai", dateOfBirth: "1974-04-22", emergencyContact: "9876543355", registrationDate: "2024-03-18", status: "Active", lastVisit: "2024-08-18", doctor: "Dr. Arun Kumar", department: "Cardiology", diagnosis: "Atrial Fibrillation" },
]

export const doctors = [
  { id: "DR-1001", name: "Dr. Arun Kumar", specialization: "Cardiologist", department: "Cardiology", qualification: "MBBS, MD, DM (Cardiology)", experience: 15, phone: "9811111111", email: "arun.kumar@hospital.com", consultationFee: 1000, availability: "09:00 AM - 01:00 PM", status: "Available", patients: 124, rating: 4.9, avatar: "AK" },
  { id: "DR-1002", name: "Dr. Priya Sharma", specialization: "Neurologist", department: "Neurology", qualification: "MBBS, MD (Neurology)", experience: 10, phone: "9811111112", email: "priya.sharma@hospital.com", consultationFee: 800, availability: "10:00 AM - 04:00 PM", status: "Available", patients: 98, rating: 4.8, avatar: "PS" },
  { id: "DR-1003", name: "Dr. Sanjay Patel", specialization: "Orthopedic Surgeon", department: "Orthopedics", qualification: "MBBS, MS (Ortho)", experience: 12, phone: "9811111113", email: "sanjay.patel@hospital.com", consultationFee: 900, availability: "08:00 AM - 12:00 PM", status: "In Surgery", patients: 112, rating: 4.7, avatar: "SP" },
  { id: "DR-1004", name: "Dr. Kavya Nair", specialization: "Gynecologist", department: "Gynecology", qualification: "MBBS, MS (OBG)", experience: 8, phone: "9811111114", email: "kavya.nair@hospital.com", consultationFee: 750, availability: "11:00 AM - 05:00 PM", status: "Available", patients: 87, rating: 4.9, avatar: "KN" },
  { id: "DR-1005", name: "Dr. Ravi Kumar", specialization: "Pediatrician", department: "Pediatrics", qualification: "MBBS, MD (Pediatrics)", experience: 9, phone: "9811111115", email: "ravi.kumar@hospital.com", consultationFee: 700, availability: "09:00 AM - 03:00 PM", status: "Available", patients: 156, rating: 4.8, avatar: "RK" },
  { id: "DR-1006", name: "Dr. Sneha Reddy", specialization: "Dermatologist", department: "Dermatology", qualification: "MBBS, MD (Dermatology)", experience: 6, phone: "9811111116", email: "sneha.reddy@hospital.com", consultationFee: 600, availability: "02:00 PM - 06:00 PM", status: "Off Duty", patients: 74, rating: 4.6, avatar: "SR" },
  { id: "DR-1007", name: "Dr. Vijay Singh", specialization: "General Physician", department: "General Medicine", qualification: "MBBS, MD", experience: 20, phone: "9811111117", email: "vijay.singh@hospital.com", consultationFee: 500, availability: "08:00 AM - 08:00 PM", status: "Available", patients: 210, rating: 4.7, avatar: "VS" },
  { id: "DR-1008", name: "Dr. Meera Joshi", specialization: "ENT Specialist", department: "ENT", qualification: "MBBS, MS (ENT)", experience: 11, phone: "9811111118", email: "meera.joshi@hospital.com", consultationFee: 650, availability: "10:00 AM - 02:00 PM", status: "Available", patients: 91, rating: 4.5, avatar: "MJ" },
]

export const appointments = [
  { id: "APT-1001", patient: "Rajesh Khanna", patientId: "PT-1001", doctor: "Dr. Arun Kumar", department: "Cardiology", date: "2024-08-31", time: "10:30 AM", status: "Scheduled", reason: "Chest pain follow-up", notes: "" },
  { id: "APT-1002", patient: "Anita Desai", patientId: "PT-1002", doctor: "Dr. Priya Sharma", department: "Neurology", date: "2024-08-31", time: "11:00 AM", status: "Confirmed", reason: "Migraine evaluation", notes: "Bring previous MRI reports" },
  { id: "APT-1003", patient: "Sunita Rao", patientId: "PT-1004", doctor: "Dr. Kavya Nair", department: "Gynecology", date: "2024-08-31", time: "02:00 PM", status: "Completed", reason: "Regular checkup", notes: "" },
  { id: "APT-1004", patient: "Arjun Mehta", patientId: "PT-1005", doctor: "Dr. Ravi Kumar", department: "Pediatrics", date: "2024-09-01", time: "09:00 AM", status: "Scheduled", reason: "Asthma follow-up", notes: "" },
  { id: "APT-1005", patient: "Karthik Suresh", patientId: "PT-1007", doctor: "Dr. Sanjay Patel", department: "Orthopedics", date: "2024-09-01", time: "10:00 AM", status: "Confirmed", reason: "Post-surgery review", notes: "" },
  { id: "APT-1006", patient: "Meena Krishnan", patientId: "PT-1008", doctor: "Dr. Arun Kumar", department: "Cardiology", date: "2024-08-30", time: "11:30 AM", status: "Completed", reason: "ECG follow-up", notes: "" },
  { id: "APT-1007", patient: "Mohammed Ibrahim", patientId: "PT-1003", doctor: "Dr. Arun Kumar", department: "Cardiology", date: "2024-08-30", time: "03:00 PM", status: "No Show", reason: "Medication review", notes: "" },
  { id: "APT-1008", patient: "Lakshmi Devi", patientId: "PT-1006", doctor: "Dr. Priya Sharma", department: "Neurology", date: "2024-09-02", time: "11:00 AM", status: "Scheduled", reason: "Stroke rehabilitation", notes: "" },
]

export const departments = [
  { id: "DEPT-01", name: "Cardiology", headDoctor: "Dr. Arun Kumar", doctors: 4, patients: 124, rooms: 8, icon: "🫀" },
  { id: "DEPT-02", name: "Neurology", headDoctor: "Dr. Priya Sharma", doctors: 3, patients: 98, rooms: 6, icon: "🧠" },
  { id: "DEPT-03", name: "Orthopedics", headDoctor: "Dr. Sanjay Patel", doctors: 4, patients: 112, rooms: 7, icon: "🦴" },
  { id: "DEPT-04", name: "Pediatrics", headDoctor: "Dr. Ravi Kumar", doctors: 3, patients: 156, rooms: 5, icon: "👶" },
  { id: "DEPT-05", name: "General Medicine", headDoctor: "Dr. Vijay Singh", doctors: 5, patients: 210, rooms: 10, icon: "💊" },
  { id: "DEPT-06", name: "Dermatology", headDoctor: "Dr. Sneha Reddy", doctors: 2, patients: 74, rooms: 4, icon: "🩺" },
  { id: "DEPT-07", name: "ENT", headDoctor: "Dr. Meera Joshi", doctors: 2, patients: 91, rooms: 4, icon: "👂" },
  { id: "DEPT-08", name: "Gynecology", headDoctor: "Dr. Kavya Nair", doctors: 3, patients: 87, rooms: 6, icon: "👩‍⚕️" },
  { id: "DEPT-09", name: "Emergency", headDoctor: "Dr. Vijay Singh", doctors: 6, patients: 45, rooms: 12, icon: "🚨" },
  { id: "DEPT-10", name: "Radiology", headDoctor: "Dr. Anand Raj", doctors: 2, patients: 63, rooms: 5, icon: "☢️" },
]

export const medicines = [
  { id: "MED-001", name: "Paracetamol 500mg", stock: 500, price: 1.50, expiryDate: "2025-12-31", batchNumber: "BATCH-001", supplier: "PharmaCorp", category: "Analgesic", status: "In Stock" },
  { id: "MED-002", name: "Amoxicillin 250mg", stock: 8, price: 12.00, expiryDate: "2024-10-15", batchNumber: "BATCH-002", supplier: "MediSupply", category: "Antibiotic", status: "Low Stock" },
  { id: "MED-003", name: "Metformin 500mg", stock: 350, price: 5.50, expiryDate: "2025-06-30", batchNumber: "BATCH-003", supplier: "HealthRx", category: "Antidiabetic", status: "In Stock" },
  { id: "MED-004", name: "Aspirin 75mg", stock: 5, price: 3.00, expiryDate: "2024-09-10", batchNumber: "BATCH-004", supplier: "PharmaCorp", category: "Antiplatelet", status: "Low Stock" },
  { id: "MED-005", name: "Atorvastatin 20mg", stock: 220, price: 18.00, expiryDate: "2025-11-30", batchNumber: "BATCH-005", supplier: "MediSupply", category: "Statin", status: "In Stock" },
  { id: "MED-006", name: "Omeprazole 20mg", stock: 180, price: 8.00, expiryDate: "2024-08-01", batchNumber: "BATCH-006", supplier: "HealthRx", category: "Antacid", status: "Expiring Soon" },
  { id: "MED-007", name: "Amlodipine 5mg", stock: 0, price: 9.50, expiryDate: "2025-03-15", batchNumber: "BATCH-007", supplier: "PharmaCorp", category: "Antihypertensive", status: "Out of Stock" },
  { id: "MED-008", name: "Ciprofloxacin 500mg", stock: 120, price: 15.00, expiryDate: "2025-09-20", batchNumber: "BATCH-008", supplier: "MediSupply", category: "Antibiotic", status: "In Stock" },
]

export const labTests = [
  { id: "LAB-001", patient: "Rajesh Khanna", patientId: "PT-1001", testName: "Complete Blood Count (CBC)", requestedBy: "Dr. Arun Kumar", date: "2024-08-31", status: "Completed", result: "Hb: 13.5 g/dL, WBC: 7200, Platelets: 250000", reportUrl: "#" },
  { id: "LAB-002", patient: "Anita Desai", patientId: "PT-1002", testName: "Lipid Profile", requestedBy: "Dr. Priya Sharma", date: "2024-08-31", status: "Processing", result: null, reportUrl: null },
  { id: "LAB-003", patient: "Mohammed Ibrahim", patientId: "PT-1003", testName: "ECG", requestedBy: "Dr. Arun Kumar", date: "2024-08-30", status: "Completed", result: "Normal Sinus Rhythm", reportUrl: "#" },
  { id: "LAB-004", patient: "Arjun Mehta", patientId: "PT-1005", testName: "Pulmonary Function Test", requestedBy: "Dr. Ravi Kumar", date: "2024-09-01", status: "Pending", result: null, reportUrl: null },
  { id: "LAB-005", patient: "Sunita Rao", patientId: "PT-1004", testName: "Blood Sugar (Fasting)", requestedBy: "Dr. Kavya Nair", date: "2024-08-29", status: "Completed", result: "98 mg/dL (Normal)", reportUrl: "#" },
  { id: "LAB-006", patient: "Meena Krishnan", patientId: "PT-1008", testName: "Thyroid Function Test", requestedBy: "Dr. Arun Kumar", date: "2024-08-31", status: "Processing", result: null, reportUrl: null },
]

export const invoices = [
  { id: "INV-1001", patient: "Rajesh Khanna", patientId: "PT-1001", date: "2024-08-31", services: [{ name: "Consultation", qty: 1, price: 1000 }, { name: "ECG", qty: 1, price: 500 }], subtotal: 1500, discount: 100, tax: 70, totalAmount: 1470, amountPaid: 1470, balanceDue: 0, status: "Paid", paymentMethod: "Card" },
  { id: "INV-1002", patient: "Anita Desai", patientId: "PT-1002", date: "2024-08-30", services: [{ name: "Consultation", qty: 1, price: 800 }, { name: "MRI Brain", qty: 1, price: 4500 }], subtotal: 5300, discount: 300, tax: 250, totalAmount: 5250, amountPaid: 2000, balanceDue: 3250, status: "Partial", paymentMethod: "Cash" },
  { id: "INV-1003", patient: "Mohammed Ibrahim", patientId: "PT-1003", date: "2024-08-28", services: [{ name: "Room Charges (3 days)", qty: 3, price: 2000 }, { name: "Surgery", qty: 1, price: 25000 }, { name: "Medicines", qty: 1, price: 1500 }], subtotal: 32500, discount: 2500, tax: 1500, totalAmount: 31500, amountPaid: 0, balanceDue: 31500, status: "Unpaid", paymentMethod: null },
  { id: "INV-1004", patient: "Sunita Rao", patientId: "PT-1004", date: "2024-08-25", services: [{ name: "Consultation", qty: 1, price: 750 }, { name: "Ultrasound", qty: 1, price: 800 }], subtotal: 1550, discount: 0, tax: 75, totalAmount: 1625, amountPaid: 1625, balanceDue: 0, status: "Paid", paymentMethod: "UPI" },
  { id: "INV-1005", patient: "Karthik Suresh", patientId: "PT-1007", date: "2024-08-29", services: [{ name: "Consultation", qty: 1, price: 900 }, { name: "X-Ray", qty: 2, price: 400 }], subtotal: 1700, discount: 0, tax: 85, totalAmount: 1785, amountPaid: 1785, balanceDue: 0, status: "Paid", paymentMethod: "Online" },
]

export const beds = [
  { id: "GEN-01", type: "General", status: "Occupied", patient: "Mohammed Ibrahim", ward: "Ward A" },
  { id: "GEN-02", type: "General", status: "Available", patient: null, ward: "Ward A" },
  { id: "GEN-03", type: "General", status: "Available", patient: null, ward: "Ward A" },
  { id: "GEN-04", type: "General", status: "Reserved", patient: null, ward: "Ward A" },
  { id: "GEN-05", type: "General", status: "Maintenance", patient: null, ward: "Ward A" },
  { id: "GEN-06", type: "General", status: "Occupied", patient: "Meena Krishnan", ward: "Ward B" },
  { id: "GEN-07", type: "General", status: "Available", patient: null, ward: "Ward B" },
  { id: "GEN-08", type: "General", status: "Available", patient: null, ward: "Ward B" },
  { id: "ICU-01", type: "ICU", status: "Occupied", patient: "Rajesh Khanna", ward: "ICU" },
  { id: "ICU-02", type: "ICU", status: "Occupied", patient: "Arjun Mehta", ward: "ICU" },
  { id: "ICU-03", type: "ICU", status: "Available", patient: null, ward: "ICU" },
  { id: "ICU-04", type: "ICU", status: "Available", patient: null, ward: "ICU" },
  { id: "EMR-01", type: "Emergency", status: "Occupied", patient: "Emergency Patient 1", ward: "Emergency" },
  { id: "EMR-02", type: "Emergency", status: "Occupied", patient: "Emergency Patient 2", ward: "Emergency" },
  { id: "EMR-03", type: "Emergency", status: "Available", patient: null, ward: "Emergency" },
]

export const staff = [
  { id: "STF-001", name: "Radha Krishnan", role: "Head Nurse", department: "Cardiology", phone: "9888111001", email: "radha@hospital.com", joiningDate: "2020-03-01", status: "Active" },
  { id: "STF-002", name: "Deepa Anand", role: "Receptionist", department: "Administration", phone: "9888111002", email: "deepa@hospital.com", joiningDate: "2021-06-15", status: "Active" },
  { id: "STF-003", name: "Raj Prabhu", role: "Pharmacist", department: "Pharmacy", phone: "9888111003", email: "raj@hospital.com", joiningDate: "2019-11-01", status: "Active" },
  { id: "STF-004", name: "Anand Subramanian", role: "Lab Technician", department: "Laboratory", phone: "9888111004", email: "anand@hospital.com", joiningDate: "2022-01-10", status: "Active" },
  { id: "STF-005", name: "Saranya Devi", role: "Nurse", department: "Pediatrics", phone: "9888111005", email: "saranya@hospital.com", joiningDate: "2021-09-20", status: "Active" },
  { id: "STF-006", name: "Kumar Rajan", role: "Administrator", department: "Administration", phone: "9888111006", email: "kumar@hospital.com", joiningDate: "2018-07-01", status: "Active" },
]

export const recentTransactions = [
  { id: "INV-1001", patient: "Rajesh Khanna", amount: 1470, method: "Card", status: "Paid", date: "2024-08-31" },
  { id: "INV-1004", patient: "Sunita Rao", amount: 1625, method: "UPI", status: "Paid", date: "2024-08-25" },
  { id: "INV-1005", patient: "Karthik Suresh", amount: 1785, method: "Online", status: "Paid", date: "2024-08-29" },
  { id: "INV-1002", patient: "Anita Desai", amount: 2000, method: "Cash", status: "Partial", date: "2024-08-30" },
]

export const notifications = [
  { id: 1, type: "emergency", title: "Emergency Case", message: "Patient in critical condition - Ward B", time: "2 min ago", read: false },
  { id: 2, type: "appointment", title: "New Appointment", message: "Appointment booked for Rajesh Khanna with Dr. Arun Kumar", time: "15 min ago", read: false },
  { id: 3, type: "medicine", title: "Low Medicine Stock", message: "Amoxicillin 250mg has only 8 units left", time: "1 hour ago", read: false },
  { id: 4, type: "lab", title: "Lab Result Ready", message: "CBC report for Rajesh Khanna is ready", time: "2 hours ago", read: true },
  { id: 5, type: "payment", title: "Pending Payment", message: "Invoice INV-1003 for Mohammed Ibrahim is overdue", time: "3 hours ago", read: true },
]

export const patientChartData = [
  { month: "Jan", patients: 186 },
  { month: "Feb", patients: 205 },
  { month: "Mar", patients: 178 },
  { month: "Apr", patients: 220 },
  { month: "May", patients: 198 },
  { month: "Jun", patients: 245 },
  { month: "Jul", patients: 232 },
  { month: "Aug", patients: 267 },
]

export const revenueChartData = [
  { month: "Jan", revenue: 285000, expenses: 180000 },
  { month: "Feb", revenue: 320000, expenses: 195000 },
  { month: "Mar", revenue: 298000, expenses: 185000 },
  { month: "Apr", revenue: 355000, expenses: 210000 },
  { month: "May", revenue: 340000, expenses: 205000 },
  { month: "Jun", revenue: 398000, expenses: 230000 },
  { month: "Jul", revenue: 380000, expenses: 225000 },
  { month: "Aug", revenue: 425000, expenses: 245000 },
]

export const departmentChartData = [
  { name: "Cardiology", value: 124 },
  { name: "Neurology", value: 98 },
  { name: "Orthopedics", value: 112 },
  { name: "Pediatrics", value: 156 },
  { name: "General", value: 210 },
  { name: "Others", value: 196 },
]

export const prescriptions = [
  { id: "PRX-001", patient: "Rajesh Khanna", patientId: "PT-1001", doctor: "Dr. Arun Kumar", date: "2024-08-31", diagnosis: "Hypertension", medicines: [{ name: "Amlodipine 5mg", dosage: "5mg", frequency: "Once daily", duration: "30 days", instructions: "Take after breakfast" }, { name: "Aspirin 75mg", dosage: "75mg", frequency: "Once daily", duration: "30 days", instructions: "Take after dinner" }] },
  { id: "PRX-002", patient: "Anita Desai", patientId: "PT-1002", doctor: "Dr. Priya Sharma", date: "2024-08-30", diagnosis: "Migraine", medicines: [{ name: "Sumatriptan 50mg", dosage: "50mg", frequency: "As needed", duration: "14 days", instructions: "Take at onset of migraine" }] },
  { id: "PRX-003", patient: "Arjun Mehta", patientId: "PT-1005", doctor: "Dr. Ravi Kumar", date: "2024-08-29", diagnosis: "Asthma", medicines: [{ name: "Salbutamol Inhaler", dosage: "2 puffs", frequency: "Twice daily", duration: "30 days", instructions: "Shake before use" }, { name: "Budesonide Inhaler", dosage: "1 puff", frequency: "Once daily", duration: "30 days", instructions: "Rinse mouth after use" }] },
]
