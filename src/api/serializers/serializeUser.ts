import { Appartment, Voucher, Booking, Order } from '../models'
import serializeAppartment from './serializeAppartment'
import serializeVoucher from './serializeVoucher'
import serializeIds from './serializeIds'
import serializeBooking from './serializeBooking'
import serializeOrder from './serializeOrder'

const serializeUser = async (userDocument, options = {}) => {
  const { onlyInfo } = options

  const user = userDocument.toObject({ versionKey: false })

  user.id = String(user._id)
  delete user._id

  if (onlyInfo) {
    user.appartments = serializeIds(user.appartments)
    user.vouchers = serializeIds(user.vouchers)

    user.bookings = serializeIds(user.bookings)
    user.orders = serializeIds(user.orders)

    return user
  }

  if (user.appartments?.length) {
    const _appartments = await Appartment.find({
      _id: { $in: user.appartments },
    })

    const promises = _appartments.map((app) => serializeAppartment(app, { onlyInfo: true }))

    user.appartments = await Promise.all(promises)
  }

  if (user.appartments?.length) {
    const _vouchers = await Voucher.find({ _id: { $in: user.vouchers } })

    const promises = _vouchers.map((voucher) => serializeVoucher(voucher))

    user.vouchers = await Promise.all(promises)
  }

  if (user.bookings?.length) {
    const _bookings = await Booking.find({ _id: { $in: user.bookings } })
    user.bookings = _bookings.map((booking) => serializeBooking(booking))
  }

  if (user.orders?.length) {
    const _orders = await Order.find({ _id: { $in: user.orders } })
    user.orders = _orders.map((order) => serializeOrder(order))
  }

  return user
}

export default serializeUser
