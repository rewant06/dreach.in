import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Fetch all users
  const users = await prisma.user.findMany();
  console.log('Users:', users);

  // Fetch all doctors with their user details
  const doctors = await prisma.doctor.findMany({
    include: {
      user: true, // Include related user details
    },
  });
  console.log('Doctors:', doctors);

  // Fetch all patients with their user details
  const patients = await prisma.patient.findMany({
    include: {
      user: true, // Include related user details
    },
  });
  console.log('Patients:', patients);

  // Fetch all prescriptions with related patient, doctor, and medications
  const prescriptions = await prisma.prescription.findMany({
    include: {
      patient: {
        include: {
          user: true, // Include patient user details
        },
      },
      doctor: {
        include: {
          user: true, // Include doctor user details
        },
      },
      medications: true, // Include related medications
    },
  });
  console.log('Prescriptions:', prescriptions);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });