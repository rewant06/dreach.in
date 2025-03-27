const schedule = await prisma.schedule.create({
    data: {
      date: new Date('2025-03-28'), // For temporary schedules
      dayOfWeek: 'Monday', // For recurring schedules
      isRecurring: true, // Indicates if the schedule is recurring
      recurrenceType: 'Weekly', // Recurrence type (e.g., Daily, Weekly)
      startTime: new Date('2025-03-28T09:00:00Z'),
      endTime: new Date('2025-03-28T11:00:00Z'),
      slotDuration: 15, // Duration of each slot in minutes
      location: 'Clinic A',
      isAvailable: true,
      serviceType: 'OndeskAppointment',
      serviceProviderId: 'service-provider-id-123',
    },
  });