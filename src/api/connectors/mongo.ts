/**
 * MongoDB connector
 */
import mongo from 'mongoose'
import logger from '../helpers/logger'

const {
  ENV,
  MONGODB_LOCAL_URL,
  MONGODB_NAME: DB,
  MONGODB_ATLAS_DEV_USERNAME: DEV_NAME,
  MONGODB_ATLAS_DEV_PASSWORD: DEV_PASS,
  MONGODB_ATLAS_DEV_CLUSTER: DEV_CLUSTER,
} = process.env

let MONGO_URI = null
switch (ENV) {
  case 'local':
    MONGO_URI = `${MONGODB_LOCAL_URL}/${DB}`
    break
  case 'dev':
    MONGO_URI = `mongodb+srv://${DEV_NAME}:${DEV_PASS}@${DEV_CLUSTER}/${DB}`
    break
  default:
    logger.log('error', 'Unrecognized environment')
}

const mongoStart = () => {
  logger.log('info', `Connecting to MongoDB using URI ${MONGO_URI}`)

  mongo.connect(MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })

  mongo.connection.once('connected', () =>
    logger.log('info', 'MongoDB connection established successfully')
  )

  mongo.connection.on('error', (error) => logger.log('error', 'MongoDB connection error: ', error))
}

export default mongoStart
