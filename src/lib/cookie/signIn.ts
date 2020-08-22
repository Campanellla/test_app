/**
 * SignIn helper
 */

import cookie from "cookie";
import Router from "next/router";
import { apolloClient as client } from "src/lib/apollo";

type signInArgs = {
  token: string;
  name: string;
};

const signIn = ({ token, name }: signInArgs): void => {
  /* Store token in cookie and clear apollo cache */
  document.cookie = cookie.serialize("token", token, {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  });
  if (client) client.resetStore();

  /* Redirect to main page */
  Router.push("/");
};

export default signIn;
