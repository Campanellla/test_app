import { Voucher } from '../../models'
import { serializeVoucher } from '../../serializers'

import mongoose from 'mongoose'

const getVoucher = async (_, args) => {
  const _voucher = await Voucher.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(args.id),
      },
    },
    // get owner
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

  if (!_voucher[0]) throw new Error('Voucher not exists')

  return serializeVoucher(_voucher[0])
}

export default getVoucher
