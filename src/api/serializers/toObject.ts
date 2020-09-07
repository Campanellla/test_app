import mongoose from 'mongoose'

const toObject = <T>(object: mongoose.Document | T): T => {
  const result = (object instanceof mongoose.Document
    ? object.toObject({ versionKey: false })
    : object) as T & {
    _id: mongoose.Types.ObjectId
    id: string
  }

  if (result._id) {
    result.id = String(result._id)
    delete result._id
  }

  return result
}

export default toObject
