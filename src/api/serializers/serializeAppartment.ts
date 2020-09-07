import mongoose from 'mongoose'

import serializeTimeSlot from './serializeTimeSlot'
import serializeUser from './serializeUser'
import serializeArray from './serializeArray'

import toObject from './toObject'

import { Appartment as AppartmentType } from '../../types'

const serializeAppartment = (
  _appartment: mongoose.Document | AppartmentType | mongoose.Types.ObjectId | string
) => {
  if (typeof _appartment === 'string') return { id: _appartment }
  if (_appartment instanceof mongoose.Types.ObjectId) return { id: String(_appartment) }

  const appartment = toObject(_appartment as mongoose.Document | AppartmentType)

  if (appartment.owner) appartment.owner = serializeUser(appartment.owner)

  if (appartment.timeSlots)
    appartment.timeSlots = serializeArray(appartment.timeSlots, serializeTimeSlot)

  return appartment
}

export default serializeAppartment
