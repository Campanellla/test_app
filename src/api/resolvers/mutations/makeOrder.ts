import { Order, User, Voucher } from '../../models'
import { serializeVoucher } from '../../serializers'

const makeOrder = async (_, args, { user }) => {
  const input = {
    voucher: args.input.voucherID,
    buyer: user.id,
    amount: args.input.amount,
  }

  const _voucher = await Voucher.findById(args.input.voucherID)
  const voucher = await serializeVoucher(_voucher, { onlyInfo: true })

  if (_voucher.quantity < input.amount) throw new Error('Not enough vouchers left')

  _voucher.quantity -= input.amount

  await _voucher.save()

  const _order = (await Order.create(input)).toObject({ versionKey: false })

  const order = { id: _order._id, voucher, buyer: user, amount: _order.amount }

  await Promise.all([
    User.findByIdAndUpdate(user.id, { $push: { orders: order.id } }),
    User.findByIdAndUpdate(_voucher.owner, { $push: { orders: order.id } }),
  ])

  return order
}

export default makeOrder
