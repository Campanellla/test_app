const serializeTimeSlot = (timeSlotDocument, { onlyInfo } = {}) => {
  const timeSlot = timeSlotDocument.toObject({ versionKey: false })

  timeSlot.id = String(timeSlot._id)
  delete timeSlot._id

  if (onlyInfo || true) {
    if (timeSlot.booking) timeSlot.booking = { id: timeSlot.booking }

    return timeSlot
  }

  return timeSlot
}

export default serializeTimeSlot
