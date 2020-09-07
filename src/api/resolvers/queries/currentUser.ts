import { User } from '../../models'
import { serializeUser } from '../../serializers'

import mongoose from 'mongoose'

const currentUser = async (_, __, { user }) => {
  if (!user) throw new Error('Not logged in')

  const _currentUser = await User.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(user.id),
      },
    },
    {
      $lookup: {
        from: 'appartments',
        localField: 'appartments',
        foreignField: '_id',
        as: 'appartments',
      },
    },
    {
      $lookup: {
        from: 'vouchers',
        localField: 'vouchers',
        foreignField: '_id',
        as: 'vouchers',
      },
    },
    {
      $lookup: {
        from: 'bookings',
        localField: 'bookings',
        foreignField: '_id',
        as: 'bookings',
      },
    },
    {
      $lookup: {
        from: 'orders',
        localField: 'orders',
        foreignField: '_id',
        as: 'orders',
      },
    },
  ])

  if (!_currentUser[0]) throw new Error('User error')

  const currentUser = serializeUser(_currentUser[0])

  return currentUser
}

export default currentUser
