import { User } from '../models'
import { User as UserType } from '../../types'

import mongoose from 'mongoose'

import { serializeUser } from '../serializers'

const context = async ({ req }) => {
  let user = null

  try {
    const { authorization } = req.headers

    //// JWT CHECK HERE

    const userBySub = await User.findOne({ userSub: authorization })

    user = serializeUser(userBySub)
  } catch (error) {}

  return { user }
}

export default context
