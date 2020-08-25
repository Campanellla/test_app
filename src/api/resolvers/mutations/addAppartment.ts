import { Appartment, TimeSlot, User } from '../../models'

const addAppartment = async (_, args, { user }) => {
  const { timeSlots, ...input } = args.input

  const _timeSlots = await TimeSlot.create(timeSlots)

  const tsid = _timeSlots.map((doc) => doc._id)

  const appartment = await Appartment.create({
    ...input,
    owner: user.id,
    timeSlots: tsid,
  })

  await User.findByIdAndUpdate(user.id, { $push: { appartments: appartment._id } })

  const { _id: id, ...rest } = appartment.toObject({ versionKey: false })

  const tsarray = _timeSlots.map((doc) => {
    const { _id: id, ...rest } = doc.toObject({ versionKey: false })
    return { id, ...rest }
  })

  const response = { id, ...rest, timeSlots: tsarray, owner: user }

  return response
}

export default addAppartment
