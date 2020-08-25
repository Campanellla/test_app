import { ApolloServer } from 'apollo-server-micro'
import { importSchema } from 'graphql-import'
import path from 'path'
import resolvers from 'src/api/resolvers'
import mongoStart from 'src/api/connectors/mongo'
import context from 'src/api/context/context'

// import getConfig from 'next/config'
// const { serverRuntimeConfig } = getConfig()

// serverRuntimeConfig.PROJECT_ROOT

mongoStart()

const p = path.resolve('src/api/schema/schema.graphql')

const typeDefs = importSchema(p)

const apolloServer = new ApolloServer({ typeDefs, resolvers, context })

const handler = apolloServer.createHandler({ path: '/api/apollo' })

export const config = {
  api: {
    bodyParser: false,
  },
}

export default handler
