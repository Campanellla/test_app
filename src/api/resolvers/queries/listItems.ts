import { Voucher, Appartment } from '../../models'
import { serializeVoucher } from '../../serializers'
import { serializeAppartment } from '../../serializers'

const listItems = async (_, args) => {
  const { sort } = args

  let sorting = { ascending: true }

  try {
    sorting = JSON.parse(sort)
  } catch (e) {}

  const {
    type,
    pricestart,
    priceend,
    datestart,
    dateend,
    rooms,
    unbooked,
    param = 'name',
  } = sorting

  const _vouchers =
    type === 'appartments'
      ? []
      : await Voucher.aggregate([
          {
            $lookup: {
              from: 'vouchers',
              localField: 'vouchers',
              foreignField: '_id',
              as: 'vouchers',
            },
          },
          {
            $lookup: {
              from: 'users',
              localField: 'owner',
              foreignField: '_id',
              as: 'owner',
            },
          },
          {
            $unwind: {
              path: '$owner',
            },
          },
        ])

  const _appartments =
    type === 'vouchers'
      ? []
      : await Appartment.aggregate([
          {
            $lookup: {
              from: 'appartments',
              localField: 'appartments',
              foreignField: '_id',
              as: 'appartments',
            },
          },
          {
            $lookup: {
              from: 'users',
              localField: 'owner',
              foreignField: '_id',
              as: 'owner',
            },
          },
          {
            $unwind: {
              path: '$owner',
            },
          },
        ])

  const promisesV = _vouchers.map((voucher) => serializeVoucher(voucher))
  const promisesA = _appartments.map((app) => serializeAppartment(app))

  const vouchers = type === 'appartments' ? ([] as unknown[]) : promisesV
  const appartments = type === 'vouchers' ? ([] as unknown[]) : promisesA

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
        if (unbooked && slot.booking?.id) return false

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
