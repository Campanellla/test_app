import { Voucher, Appartment } from '../../models'
import { serializeVoucher } from '../../serializers'
import { serializeAppartment } from '../../serializers'

const listItems = async (_, args) => {
  const { sort } = args

  let sorting = { ascending: true }

  try {
    sorting = JSON.parse(sort)
  } catch (e) {}

  const { onlyAppartments, onlyVouchers, param = 'name' } = sorting

  const _vouchers = onlyAppartments ? [] : await Voucher.find({})
  const _appartments = onlyVouchers ? [] : await Appartment.find({})

  const promisesV = _vouchers.map((voucher) => serializeVoucher(voucher))
  const promisesA = _appartments.map((app) => serializeAppartment(app))

  const vouchers = onlyAppartments ? ([] as unknown[]) : await Promise.all(promisesV)
  const appartments = onlyVouchers ? ([] as unknown[]) : await Promise.all(promisesA)

  const items: ({ appartment: any; voucher: null } | { voucher: any; appartment: null })[] = [
    ...vouchers.map((voucher: any) => ({ voucher, appartment: null })),
    ...appartments.map((appartment: any) => ({ appartment, voucher: null })),
  ]

  if (sorting.ascending)
    items.sort((a, b) =>
      (a.appartment || a.voucher)?.name <= (b.appartment || b.voucher)?.[param] ? 0 : 1
    )

  if (sorting.descending)
    items.sort((a, b) =>
      (a.appartment || a.voucher)?.name >= (b.appartment || b.voucher)?.[param] ? 0 : 1
    )

  return items
}

export default listItems
