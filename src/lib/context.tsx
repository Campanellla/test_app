import React from "react";
import { useQuery } from "@apollo/client";
import currentUserSchema from "src/graphql/query/currentUser.graphql";
import type { User } from "src/types";

export type CurrentUser = User | null;

const CurrentUserContext = React.createContext<CurrentUser>(null);

export const CurrentUserProvider: React.FC = ({ children }) => {
  const { data, loading } = useQuery(currentUserSchema, {
    errorPolicy: "all",
  });

  let currentUser: CurrentUser = null;

  if (loading) currentUser = {} as User;
  if (data?.currentUser) ({ currentUser } = data);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserContext;
