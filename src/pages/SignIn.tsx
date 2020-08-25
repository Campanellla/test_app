import React from 'react'
import { useMutation, ApolloError } from '@apollo/client'
import { Input, Button } from 'semantic-ui-react'
import styled from 'styled-components'
import Router from 'next/router'

import signInHelper from 'src/lib/cookie/signIn'
import Header from 'src/components/Header'
import userSignInSchema from 'src/graphql/mutation/signIn.graphql'

export default function Main() {
  const [signInMutation] = useMutation(userSignInSchema, {
    onCompleted: ({ signIn }) => {
      if (signIn) {
        signInHelper({ ...signIn })
        Router.push('/')
      }
    },
    onError: (error: ApolloError) => {
      setError(error.message || 'Server rejects')
    },
  })

  const [email, setEmail] = React.useState('hello')
  const [password, setPassword] = React.useState('world')

  const [error, setError] = React.useState<string | null>(null)

  return (
    <>
      <Header />
      <Container>
        <div className="header">Sign in:</div>

        {error ? (
          <Button color="red" basic onClick={() => setError(null)}>
            {error}
          </Button>
        ) : null}

        <Input
          value={email}
          placeholder="email"
          type="email"
          onChange={(e) => setEmail(e.currentTarget.value || '')}
        />

        <Input
          value={password}
          placeholder="password"
          type="password"
          onChange={(e) => setPassword(e.currentTarget.value || '')}
        />

        <Button
          onClick={() => {
            signInMutation({ variables: { input: { email, password } } })
          }}
        >
          Sign in
        </Button>
      </Container>
    </>
  )
}

const Container = styled.div`
  display: grid;
  grid-auto-rows: 1fr;
  max-width: 45rem;
  margin: auto;
  margin-top: 2rem;
  gap: 1rem;

  &&& > button {
    margin: 0;
  }

  .header {
    text-align: center;
  }
`
