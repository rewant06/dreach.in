import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create a user for the doctor
  const doctorUser = await prisma.user.create({
    data: {
      name: 'Dr.Shreya Raj',
      email: 'shreyaraj@gmail.com',
      password: 'securepassword',
      phone: '1234567890',
      role: 'DOCTOR',
    },
  });

  // Create a doctor linked to the doctor user
  const doctor = await prisma.doctor.create({
    data: {
      userId: doctorUser.id, // Link the doctor to the doctor user
      specialization: 'Cardiology',
    },
  });

  // Create a user for the patient
  const patientUser = await prisma.user.create({
    data: {
      name: 'Anand Kumar',
      email: 'anand@dreach.in',
      password: 'securepassword',
      phone: '0987654321',
      role: 'PATIENT',
    },
  });

  // Create a patient linked to the patient user
  const patient = await prisma.patient.create({
    data: {
      userId: patientUser.id, // Link the patient to the patient user
      address: 'Patna, Bihar',
      conditions: ['Hypertension'],
      bloodGroup: 'O+',
    },
  });

  // Create a prescription
  const prescription = await prisma.prescription.create({
    data: {
      patientId: patient.id,
      doctorId: doctor.id,
      medications: {
        create: [
          {
            name: 'Paracetamol',
            dosage: '500mg',
            frequency: 'Twice a day',
            duration: '5 days',
            status: 'Active',
            patientId: patient.id,
          },
          {
            name: 'Ibuprofen',
            dosage: '200mg',
            frequency: 'Once a day',
            duration: '3 days',
            status: 'Active',
            patientId: patient.id,
          },
        ],
      },
      notes: 'Take medications after meals.',
      dateIssued: new Date(),
    },
  });

  console.log({ doctorUser, doctor, patientUser, patient, prescription });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });