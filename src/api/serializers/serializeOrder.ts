const serializeOrder = (order) => {
  const { _id: id, voucher, amount, buyer } = order.toObject({ versionKey: false })

  return {
    id,
    voucher: { id: String(voucher) },
    amount,
    buyer: { id: String(buyer) },
  }
}

export default serializeOrder
