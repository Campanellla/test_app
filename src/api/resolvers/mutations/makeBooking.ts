import { Booking, User, Appartment, TimeSlot } from '../../models'
import { serializeAppartment, serializeTimeSlot } from '../../serializers'

const makeBooking = async (_, args, { user }) => {
  const input = {
    appartment: args.input.appartmentID,
    buyer: user.id,
    timeSlot: args.input.timeSlot,
  }

  const _timeSlot = await TimeSlot.findById(args.input.timeSlot)
  const timeSlot = serializeTimeSlot(_timeSlot, { onlyInfo: true })

  if (_timeSlot.booking) throw new Error('Time slot already booked')

  const _booking = (await Booking.create(input)).toObject({ versionKey: false })

  const _appartment = await Appartment.findById(args.input.appartmentID)
  const appartment = await serializeAppartment(_appartment, { onlyInfo: true })

  const booking = { id: _booking._id, appartment, timeSlot, buyer: user }

  await Promise.all([
    User.findByIdAndUpdate(user.id, { $push: { bookings: booking.id } }),
    User.findByIdAndUpdate(_appartment.owner, { $push: { bookings: booking.id } }),
  ])

  return booking
}

export default makeBooking
