import { Order } from '../../models'
import { serializeOrder } from '../../serializers'

const listOrders = async (_, __, { user }) => {
  if (!user.id) return []

  if (user.type === 'admin') {
    const orders = await Order.find({})
    return orders.map((order) => serializeOrder(order))
  }

  return user.orders.map((order) => serializeOrder(order))
}

export default listOrders
