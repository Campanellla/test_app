import { Voucher } from '../../models'
import { serializeVoucher } from '../../serializers'

const getVoucher = async (_, args) => {
  const _voucher = await Voucher.findById(args.id)
  return await serializeVoucher(_voucher)
}

export default getVoucher
