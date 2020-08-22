import { ApolloServer } from "apollo-server-micro";
import { importSchema } from "graphql-import";
import path from "path";
import resolvers from "src/api/resolvers";
import mongoStart from "src/api/connectors/mongo";
import context from "src/api/context/context";

mongoStart();

const typeDefs = importSchema(
  path.join(process.env.PWD, "src/api/schema/schema.graphql")
);

const apolloServer = new ApolloServer({ typeDefs, resolvers, context });

const handler = apolloServer.createHandler({ path: "/api/apollo" });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
