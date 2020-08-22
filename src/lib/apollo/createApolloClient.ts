/**
 * Apollo client creator
 */

import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

export type createApolloClientOptions = {
  getToken: () => string;
};

const createApolloClient = (
  initialState: NormalizedCacheObject,
  { getToken }: createApolloClientOptions
): ApolloClient<NormalizedCacheObject> => {
  const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    credentials: "same-origin",
  });

  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      authorization: getToken() || "",
      "Access-Control-Max-Age": 10000,
    },
  }));

  const apolloClient = new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState || {}),
  });

  return apolloClient;
};

export default createApolloClient;
