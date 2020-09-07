import mongoose from 'mongoose'

import serializeAppartment from './serializeAppartment'
import serializeTimeSlot from './serializeTimeSlot'
import serializeUser from './serializeUser'
import toObject from './toObject'

import { Booking as BookingType } from '../../types'

const serializeBooking = (
  _booking: mongoose.Document | BookingType | mongoose.Types.ObjectId | string
) => {
  if (typeof _booking === 'string') return { id: _booking }
  if (_booking instanceof mongoose.Types.ObjectId) return { id: String(_booking) }

  const booking = toObject(_booking as mongoose.Document | BookingType)

  if (booking.appartment) booking.appartment = serializeAppartment(booking.appartment)
  if (booking.timeSlot) booking.timeSlot = serializeTimeSlot(booking.timeSlot)
  if (booking.buyer) booking.buyer = serializeUser(booking.buyer)

  return booking
}

export default serializeBooking
