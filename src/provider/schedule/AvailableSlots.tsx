const availableSlots = await prisma.slot.findMany({
    where: {
      scheduleId: 'schedule-id-123',
      isBooked: false,
    },
  });