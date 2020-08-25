const serializeBooking = (booking) => {
  const { _id: id, appartment, timeSlot, buyer } = booking.toObject({ versionKey: false })
  return {
    id,
    appartment: { id: String(appartment) },
    timeSlot: { id: String(timeSlot) },
    buyer: { id: String(buyer) },
  }
}

export default serializeBooking
