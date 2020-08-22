const serializeTimeSlot = (timeSlotDocument) => {
  const timeSlot = timeSlotDocument.toObject({ versionKey: false });

  timeSlot.id = timeSlot._id;
  delete timeSlot._id;

  timeSlot.user = { id: timeSlot.user };

  return timeSlot;
};

export default serializeTimeSlot;
