import mongoose from 'mongoose'

import serializeUser from './serializeUser'
import toObject from './toObject'

import { Voucher as VoucherType } from '../../types'

const serializeVoucher = (
  _voucher: mongoose.Document | VoucherType | mongoose.Types.ObjectId | string
) => {
  if (typeof _voucher === 'string') return { id: _voucher }
  if (_voucher instanceof mongoose.Types.ObjectId) return { id: String(_voucher) }

  const voucher = toObject(_voucher)

  if (voucher.owner) voucher.owner = serializeUser(voucher.owner)

  return voucher
}

export default serializeVoucher
