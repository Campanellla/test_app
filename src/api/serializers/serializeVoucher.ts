import { User } from '../models'
import serializeUser from './serializeUser'

const serializeAppartment = async (voucherDocument, options = {}) => {
  const { onlyInfo } = options

  const voucher = voucherDocument.toObject({ versionKey: false })

  voucher.id = String(voucher._id)
  delete voucher._id

  if (onlyInfo) {
    voucher.owner = { id: voucher.owner }
    return voucher
  }

  const _owner = await User.findById(voucher.owner)
  voucher.owner = await serializeUser(_owner, { onlyInfo: true })

  return voucher
}

export default serializeAppartment
