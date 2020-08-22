import React from "react";
import { useMutation } from "@apollo/client";
import { Input, Button } from "semantic-ui-react";

import userSignUpSchema from "src/graphql/mutation/signUp.graphql";
import styled from "styled-components";

import Header from "src/components/Header";

export default function signup() {
  const [signUpMutation] = useMutation(userSignUpSchema, {
    onCompleted: () => setSuccess(true),
    onError: (error) => setError(error.message || "Server rejects"),
  });

  const [firstName, setFirstName] = React.useState("first name");
  const [lastName, setLastName] = React.useState("last name");

  const [type, setType] = React.useState("buyer");

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordRepeat, setPasswordRepeat] = React.useState("");

  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  const signUp = () => {
    if (!firstName || !lastName || !type || !email || !password) {
      setError("All fields required");
      return;
    }

    if (password !== passwordRepeat) {
      setError("Password not match");
      return;
    }
    const _type = type.toLowerCase();

    if (_type !== "buyer" && _type !== "seller") {
      setError("type can be buyer or seller");
      return;
    }

    signUpMutation({
      variables: {
        input: { email, password, firstName, lastName, type: _type },
      },
    });
  };

  return (
    <>
      <Header />
      <Container>
        <div className="header">Sign up:</div>

        {error ? (
          <Button color="red" basic onClick={() => setError(null)}>
            {error}
          </Button>
        ) : null}

        {success ? (
          <Button color="green" basic onClick={() => setSuccess(false)}>
            You sign up successfully
          </Button>
        ) : null}

        <Input
          value={email}
          placeholder="email"
          type="email"
          onChange={(e) => setEmail(e.currentTarget.value || "")}
        />

        <Input
          value={firstName}
          placeholder="First name"
          onChange={(e) => setFirstName(e.currentTarget.value || "")}
        />

        <Input
          value={lastName}
          placeholder="Last name"
          onChange={(e) => setLastName(e.currentTarget.value || "")}
        />

        <Input
          value={type}
          placeholder="type"
          onChange={(e) => setType(e.currentTarget.value || "")}
        />

        <Input
          value={password}
          placeholder="password"
          type="password"
          onChange={(e) => setPassword(e.currentTarget.value || "")}
        />

        <Input
          value={passwordRepeat}
          placeholder="Repeat password"
          type="password"
          onChange={(e) => setPasswordRepeat(e.currentTarget.value || "")}
        />

        <Button onClick={signUp}>Sign up</Button>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-auto-rows: 1fr;
  max-width: 25rem;
  margin: auto;
  gap: 0.25rem;

  &&& > button {
    margin: 0;
  }

  .header {
    text-align: center;
  }
`;
