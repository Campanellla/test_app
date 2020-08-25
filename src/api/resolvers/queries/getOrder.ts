import { Order, User, Voucher } from '../../models'
import { serializeOrder, serializeUser, serializeVoucher } from '../../serializers'

export default async (_, args) => {
  const _order = await Order.findById(args.id)

  const order = serializeOrder(_order)

  const _user = await User.findById(order.buyer.id)
  order.buyer = await serializeUser(_user, { onlyInfo: true })

  const _voucher = await Voucher.findById(order.voucher.id)
  order.voucher = await serializeVoucher(_voucher, { onlyInfo: true })

  return order
}
