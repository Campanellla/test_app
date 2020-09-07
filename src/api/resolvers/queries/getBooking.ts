import { Booking } from '../../models'
import { serializeBooking } from '../../serializers'

import mongoose from 'mongoose'

const getBooking = async (_, { id }) => {
  const _booking = await Booking.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(id),
      },
    },
    // get appartment
    {
      $lookup: {
        from: 'appartments',
        localField: 'appartment',
        foreignField: '_id',
        as: 'appartment',
      },
    },
    {
      $unwind: {
        path: '$appartment',
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'appartment.owner',
        foreignField: '_id',
        as: 'appartment.owner',
      },
    },
    {
      $unwind: {
        path: '$appartment.owner',
      },
    },
    // get buyer
    {
      $lookup: {
        from: 'users',
        localField: 'buyer',
        foreignField: '_id',
        as: 'buyer',
      },
    },
    {
      $unwind: {
        path: '$buyer',
      },
    },
    //get time slot
    {
      $lookup: {
        from: 'timeslots',
        localField: 'timeSlot',
        foreignField: '_id',
        as: 'timeSlot',
      },
    },
    {
      $unwind: {
        path: '$timeSlot',
      },
    },
  ])

  if (!_booking[0]) throw new Error('Booking not exists')

  return serializeBooking(_booking[0])
}

export default getBooking
