import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // Clean up existing data
  await prisma.admission.deleteMany()
  await prisma.bed.deleteMany()
  await prisma.invoice.deleteMany()
  await prisma.labTest.deleteMany()
  await prisma.prescription.deleteMany()
  await prisma.medicine.deleteMany()
  await prisma.appointment.deleteMany()
  await prisma.doctor.deleteMany()
  await prisma.department.deleteMany()
  await prisma.patient.deleteMany()
  await prisma.user.deleteMany()

  // 1. Create Departments
  const cardio = await prisma.department.create({
    data: { name: 'Cardiology' },
  })
  const neuro = await prisma.department.create({
    data: { name: 'Neurology' },
  })
  const ortho = await prisma.department.create({
    data: { name: 'Orthopedics' },
  })
  const pedia = await prisma.department.create({
    data: { name: 'Pediatrics' },
  })
  const general = await prisma.department.create({
    data: { name: 'General Medicine' },
  })

  // 2. Create Users & Doctors
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@hospital.com',
      password: 'password123', // In a real app, hash this!
      name: 'Super Admin',
      role: 'ADMIN',
    },
  })

  const drArunUser = await prisma.user.create({
    data: {
      email: 'arun@hospital.com',
      password: 'password123',
      name: 'Dr. Arun Kumar',
      role: 'DOCTOR',
    },
  })
  const drArun = await prisma.doctor.create({
    data: {
      userId: drArunUser.id,
      doctorId: 'DR-1001',
      specialization: 'Cardiologist',
      departmentId: cardio.id,
      qualification: 'MBBS, MD, DM',
      experience: 15,
      consultationFee: 1000,
      availability: '09:00 AM - 01:00 PM',
    },
  })

  const drPriyaUser = await prisma.user.create({
    data: {
      email: 'priya@hospital.com',
      password: 'password123',
      name: 'Dr. Priya Sharma',
      role: 'DOCTOR',
    },
  })
  const drPriya = await prisma.doctor.create({
    data: {
      userId: drPriyaUser.id,
      doctorId: 'DR-1002',
      specialization: 'Neurologist',
      departmentId: neuro.id,
      qualification: 'MBBS, MD',
      experience: 10,
      consultationFee: 800,
      availability: '10:00 AM - 04:00 PM',
    },
  })

  // 3. Create Patients
  const patient1 = await prisma.patient.create({
    data: {
      patientId: 'PT-1001',
      name: 'Rajesh Khanna',
      dateOfBirth: new Date('1980-05-15'),
      gender: 'Male',
      bloodGroup: 'O+',
      phone: '9876543210',
      email: 'rajesh@example.com',
      address: '123 Main St, City',
      emergencyContact: '9876543211',
    },
  })

  const patient2 = await prisma.patient.create({
    data: {
      patientId: 'PT-1002',
      name: 'Anita Desai',
      dateOfBirth: new Date('1992-08-22'),
      gender: 'Female',
      bloodGroup: 'A+',
      phone: '9876543222',
      email: 'anita@example.com',
      address: '456 Park Ave, City',
      emergencyContact: '9876543233',
    },
  })

  // 4. Create Appointments
  await prisma.appointment.create({
    data: {
      patientId: patient1.id,
      doctorId: drArun.id,
      date: new Date(),
      time: '10:30 AM',
      status: 'SCHEDULED',
      reason: 'Chest pain evaluation',
    },
  })

  // 5. Create Medicines (Pharmacy)
  await prisma.medicine.create({
    data: {
      name: 'Paracetamol 500mg',
      stock: 500,
      price: 1.5,
      expiryDate: new Date('2025-12-31'),
      batchNumber: 'BATCH-001',
      supplier: 'PharmaCorp',
    },
  })

  // 6. Create Beds
  await prisma.bed.create({
    data: {
      bedNumber: 'GEN-01',
      type: 'GENERAL',
      status: 'AVAILABLE',
    },
  })
  await prisma.bed.create({
    data: {
      bedNumber: 'ICU-01',
      type: 'ICU',
      status: 'AVAILABLE',
    },
  })

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
