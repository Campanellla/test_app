import React from "react";

import currentUserContext from "src/lib/context";

import { Button } from "semantic-ui-react";
import Router from "next/router";
import styled from "styled-components";

export default function Header() {
  const currentUser = React.useContext(currentUserContext);

  return (
    <HeaderContainer>
      <Button onClick={() => Router.push("/signin")}>Sign In</Button>
      <Button onClick={() => Router.push("/signup")}>Sign Up</Button>
      <Button onClick={() => Router.push("/")}>Main</Button>
      <div></div>

      {currentUser?.id ? (
        <div>
          <div>Email: {currentUser.email}</div>
          <div>Name: {`${currentUser.firstName} ${currentUser.lastName}`}</div>
        </div>
      ) : null}
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  background-color: rgb(250, 250, 250);
  position: sticky;
  top: 0;
  z-index: 100;

  display: grid;
  grid-template-columns: auto auto auto 1fr auto;
`;
