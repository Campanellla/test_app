import mongoose from 'mongoose'

import serializeBooking from './serializeBooking'
import toObject from './toObject'

import { TimeSlot as TimeSlotType } from '../../types'

const serializeTimeSlot = (
  _timeSlot: mongoose.Document | TimeSlotType | mongoose.Types.ObjectId | string
) => {
  if (typeof _timeSlot === 'string') return { id: _timeSlot }
  if (_timeSlot instanceof mongoose.Types.ObjectId) return { id: String(_timeSlot) }

  const timeSlot = toObject(_timeSlot as mongoose.Document | TimeSlotType)

  if (timeSlot.booking) timeSlot.booking = serializeBooking(timeSlot.booking)

  return timeSlot
}

export default serializeTimeSlot
