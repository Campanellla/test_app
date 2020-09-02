import { Appartment } from '../../models'

const listItems = async (_, args) => {
  const { sort } = args

  let sorting = {}

  try {
    sorting = JSON.parse(sort)
  } catch (e) {}

  const { datestart, dateend } = sorting

  const match = {
    $match: {
      timeSlots: {
        $elemMatch: {
          booking: { $exists: false },
        },
      },
    },
  }

  if (datestart) match.$match.timeSlots.$elemMatch.start = { $gt: datestart }
  if (dateend) match.$match.timeSlots.$elemMatch.end = { $lt: dateend }

  const res = await Appartment.aggregate([
    {
      $lookup: {
        from: 'timeslots',
        localField: 'timeSlots',
        foreignField: '_id',
        as: 'timeSlots',
      },
    },
    match,
    { $sortByCount: '$rooms' },
    {
      $project: {
        rooms: '$_id',
        unbooked: '$count',
      },
    },
    { $sort: { unbooked: -1 } },
  ])

  return res
}

export default listItems
