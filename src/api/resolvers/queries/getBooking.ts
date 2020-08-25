import { Booking, User, Appartment, TimeSlot } from '../../models'
import {
  serializeBooking,
  serializeUser,
  serializeAppartment,
  serializeTimeSlot,
} from '../../serializers'

export default async (_, args) => {
  const _booking = await Booking.findById(args.id)

  const booking = serializeBooking(_booking)

  const _user = await User.findById(booking.buyer.id)
  booking.buyer = await serializeUser(_user, { onlyInfo: true })

  const _appartment = await Appartment.findById(booking.appartment.id)
  booking.appartment = await serializeAppartment(_appartment, { onlyInfo: true })

  const _timeSlot = await TimeSlot.findById(booking.timeSlot.id)
  booking.timeSlot = serializeTimeSlot(_timeSlot, { onlyInfo: true })

  return booking
}
