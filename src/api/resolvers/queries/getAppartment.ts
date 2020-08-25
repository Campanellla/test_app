import { Appartment } from '../../models'
import { serializeAppartment } from '../../serializers'

const getAppartment = async (_, args) => {
  const _appartment = await Appartment.findById(args.id)
  return await serializeAppartment(_appartment)
}

export default getAppartment
