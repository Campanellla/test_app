import { User } from '../../models/User'

export default async (_, args) => {
  const input = args?.input

  const userExist = await User.exists({ email: input?.email })

  if (userExist) throw new Error('User Exists')

  const { password, ...rest } = input

  const user = await User.create({ ...rest, userSub: password })

  const { _id: id, ..._rest } = user.toObject({ versionKey: false })

  return { id, ..._rest }
}
