import mongoose from 'mongoose'

import serializeArray from './serializeArray'
import toObject from './toObject'

import serializeAppartment from './serializeAppartment'
import serializeVoucher from './serializeVoucher'
import serializeBooking from './serializeBooking'
import serializeOrder from './serializeOrder'

import { User as UserType } from '../../types'

const serializeUser = (_user: mongoose.Document | UserType | mongoose.Types.ObjectId | string) => {
  if (typeof _user === 'string') return { id: _user }
  if (_user instanceof mongoose.Types.ObjectId) return { id: String(_user) }

  const user = toObject(_user as mongoose.Document | UserType)

  user.appartments = serializeArray(user.appartments, serializeAppartment)
  user.vouchers = serializeArray(user.vouchers, serializeVoucher)

  user.bookings = serializeArray(user.bookings, serializeBooking)
  user.orders = serializeArray(user.orders, serializeOrder)

  return user
}

export default serializeUser
