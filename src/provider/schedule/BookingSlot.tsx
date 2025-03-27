const bookSlot = async (slotId: string, appointmentId: string) => {
    await prisma.slot.update({
      where: { id: slotId },
      data: {
        isBooked: true,
        appointmentId,
      },
    });
  };
  
  // Example usage
  await bookSlot('slot-id-456', 'appointment-id-789');