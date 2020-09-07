import mongoose from 'mongoose'

import serializeVoucher from './serializeVoucher'
import serializeUser from './serializeUser'
import toObject from './toObject'

import { Order as OrderType } from '../../types'

const serializeOrder = (
  _order: mongoose.Document | OrderType | mongoose.Types.ObjectId | string
) => {
  if (typeof _order === 'string') return { id: _order }
  if (_order instanceof mongoose.Types.ObjectId) return { id: String(_order) }

  const order = toObject(_order)

  if (order.voucher) order.voucher = serializeVoucher(order.voucher)

  if (order.buyer) order.buyer = serializeUser(order.buyer)

  return order
}

export default serializeOrder
