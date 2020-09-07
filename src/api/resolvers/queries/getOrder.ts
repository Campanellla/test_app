import { Order } from '../../models'
import { serializeOrder } from '../../serializers'

import mongoose from 'mongoose'

const getOrder = async (_, args) => {
  const _order = await Order.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(args.id),
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
    // get voucher
    {
      $lookup: {
        from: 'vouchers',
        localField: 'voucher',
        foreignField: '_id',
        as: 'voucher',
      },
    },
    {
      $unwind: {
        path: '$voucher',
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'voucher.owner',
        foreignField: '_id',
        as: 'voucher.owner',
      },
    },
    {
      $unwind: {
        path: '$voucher.owner',
      },
    },
  ])

  if (!_order[0]) throw new Error('Order not exists')

  return serializeOrder(_order[0])
}

export default getOrder
