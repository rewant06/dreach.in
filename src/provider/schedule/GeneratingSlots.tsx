const generateSlots = async (scheduleId: string, startTime: Date, endTime: Date, duration: number) => {
    const slots = [];
    let currentTime = new Date(startTime);
  
    while (currentTime < endTime) {
      const nextTime = new Date(currentTime.getTime() + duration * 60000); // Add duration in minutes
      if (nextTime > endTime) break;
  
      slots.push({
        startTime: currentTime,
        endTime: nextTime,
        scheduleId,
      });
  
      currentTime = nextTime;
    }
  
    await prisma.slot.createMany({ data: slots });
  };
  
  // Example usage
  await generateSlots(
    'schedule-id-123',
    new Date('2025-03-28T09:00:00Z'),
    new Date('2025-03-28T11:00:00Z'),
    15 // Slot duration in minutes
  );
  