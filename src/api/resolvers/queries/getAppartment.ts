import { Appartment } from '../../models'
import { serializeAppartment } from '../../serializers'

import mongoose from 'mongoose'

const getAppartment = async (_, args) => {
  const _appartment = await Appartment.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(args.id),
      },
    },
    {
      $lookup: {
        from: 'timeslots',
        localField: 'timeSlots',
        foreignField: '_id',
        as: 'timeSlots',
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'owner',
        foreignField: '_id',
        as: 'owner',
      },
    },
    {
      $unwind: {
        path: '$owner',
      },
    },
  ])

  if (!_appartment) throw new Error('Appartment not exists')

  return await serializeAppartment(_appartment[0])
}

export default getAppartment
