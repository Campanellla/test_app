/**
 * Apollo initializer
 */

import fetch from "isomorphic-unfetch";
import React from "react";
import Head from "next/head";
import createApolloClient, {
  createApolloClientOptions,
} from "./createApolloClient";
import parseCookie from "../cookie/parseCookie";

import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { NextPageContext } from "next";
import { AppContext, AppInitialProps } from "next/app";

import { getDataFromTree } from "@apollo/react-ssr";

interface ExtendedAppContext extends AppContext {
  apolloState: NormalizedCacheObject;
  ctx: {
    apolloClient?: ApolloClient<NormalizedCacheObject>;
  } & NextPageContext;
}

/* Polyfill fetch() on the server (used by apollo-client) */
if (!process.browser) global.fetch = fetch;

export let apolloClient: ApolloClient<NormalizedCacheObject> | null = null; // APOLLOCLIENT ENDPOINT HERE!

const initApollo = (
  initialState: NormalizedCacheObject,
  options: createApolloClientOptions
) => {
  if (!process.browser) return createApolloClient(initialState, options);
  if (!apolloClient) apolloClient = createApolloClient(initialState, options);
  return apolloClient;
};

const withApollo = (App: any) => {
  return class Apollo extends React.Component {
    static displayName = "withApollo(App)";

    static async getInitialProps(ctx: AppContext) {
      const {
        AppTree,
        ctx: { req },
      } = ctx;

      /* Save user agent from request header */
      if (req)
        global.navigator = {
          ...(global.navigator || {}),
          userAgent: req.headers["user-agent"] as string,
        };

      let appProps: AppInitialProps = {} as AppInitialProps;
      if (App.getInitialProps) {
        appProps = (await App.getInitialProps(ctx)) as AppInitialProps;
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      const apollo = initApollo(
        {},
        {
          getToken: () => parseCookie(req).token,
        }
      );
      if (typeof window === "undefined") {
        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <AppTree {...appProps} apolloClient={apollo} />
          );
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
          console.error("Error while running `getDataFromTree`", error);
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
      }

      // Extract query data from the Apollo store
      const apolloState = apollo.cache.extract();

      return {
        ...appProps,
        apolloState,
      };
    }

    apolloClient: ApolloClient<NormalizedCacheObject>;

    constructor(props: ExtendedAppContext) {
      super(props);
      this.apolloClient = initApollo(props.apolloState, {
        getToken: () => parseCookie().token,
      });
    }

    render() {
      return <App apolloClient={this.apolloClient} {...this.props} />;
    }
  };
};

export default withApollo;
