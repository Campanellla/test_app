import { Voucher, Appartment } from '../../models'
import { serializeVoucher } from '../../serializers'
import { serializeAppartment } from '../../serializers'

const listItems = async (_, args) => {
  const { sort } = args

  let sorting = { ascending: true }

  try {
    sorting = JSON.parse(sort)
  } catch (e) {}

  const { type, pricestart, priceend, datestart, dateend, rooms, param = 'name' } = sorting

  const _vouchers = type === 'appartments' ? [] : await Voucher.find({})
  const _appartments = type === 'vouchers' ? [] : await Appartment.find({})

  const promisesV = _vouchers.map((voucher) => serializeVoucher(voucher))
  const promisesA = _appartments.map((app) => serializeAppartment(app))

  const vouchers = type === 'appartments' ? ([] as unknown[]) : await Promise.all(promisesV)
  const appartments = type === 'vouchers' ? ([] as unknown[]) : await Promise.all(promisesA)

  let items: ({ appartment: any; voucher: null } | { voucher: any; appartment: null })[] = [
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

  if (Number(pricestart) > 0)
    items = items.filter((item) => (item.appartment || item.voucher)?.price > Number(pricestart))

  if (Number(priceend) > 0)
    items = items.filter((item) => (item.appartment || item.voucher)?.price < Number(priceend))

  if (Number(rooms) > 0) items = items.filter((item) => item.appartment?.rooms === Number(rooms))

  if (datestart || dateend)
    items = items.filter((item) => {
      const slots = item.appartment?.timeSlots?.filter((slot) => {
        if (!slot?.start) return false

        const start = new Date(slot.start)
        const end = new Date(slot.end)

        if (datestart && start < new Date(datestart)) return false

        if (dateend && end > new Date(dateend)) return false

        return true
      })
      if (slots?.length > 0) return true

      return false
    })

  return items
}

export default listItems
