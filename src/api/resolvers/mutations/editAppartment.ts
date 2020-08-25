import { Appartment, TimeSlot } from '../../models'

const addVoucher = async (_, args, { user }) => {
  const { id, timeSlots, ...input } = args.input

  if (!user?.appartments?.find((app) => String(app.id) === id))
    throw new Error('You not the owner of appartment')

  let _timeSlots = []

  if (timeSlots) {
    const oldslots = timeSlots.filter((slot) => slot.id)
    const newslots = timeSlots.filter((slot) => !slot.id)

    const _slots = await TimeSlot.create(newslots)

    let slots = []

    if (_slots?.length) {
      slots = _slots.map((slot) => slot.toObject({ versionKey: false })._id)
    }

    _timeSlots = [...oldslots, ...slots]

    input.timeSlots = _timeSlots.map(({ id }) => id)
  }

  const { _id, ...rest } = (
    await Appartment.findByIdAndUpdate(id, input, {
      new: true,
    })
  ).toObject({ versionKey: false })

  const response = { id, ...rest, owner: user, timeSlots: _timeSlots }

  return response
}

export default addVoucher
