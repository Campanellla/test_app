import React from 'react'
import Header from 'src/components/Header'

import { useQuery, useMutation } from '@apollo/client'

import getVoucherSchema from 'src/graphql/query/getVoucher.graphql'
import makeOrderSchema from 'src/graphql/mutation/makeOrder.graphql'

import { Loader, Card, Button, Input } from 'semantic-ui-react'

import styled from 'styled-components'

export default function Order({ id = '' }) {
  const { loading, data, error: apolloError } = useQuery(getVoucherSchema, {
    variables: { id },
  })

  const [amount, setAmount] = React.useState(1)
  const [error, setError] = React.useState<string | null>(null)
  const [success, setSuccess] = React.useState(false)

  const voucher = data?.getVoucher

  const [makeOrder] = useMutation(makeOrderSchema, {
    refetchQueries: [{ query: getVoucherSchema, variables: { id } }],
    onCompleted: () => setSuccess(true),
    onError: (e) => setError(e.message),
  })

  const order = () => {
    const input = {
      voucherID: voucher.id,
      amount,
    }

    makeOrder({ variables: { input } })
  }

  if (loading)
    return (
      <div>
        <Header />
        <Loader active>Loading</Loader>
      </div>
    )

  if (apolloError || !voucher)
    return (
      <div>
        <Header />
        Error: {error ? error.message : 'no voucher exist'}
      </div>
    )

  return (
    <div>
      <Header />

      {success ? (
        <Button color="green" basic onClick={() => setSuccess(false)}>
          You ordered voucher sucessfully
        </Button>
      ) : null}

      {error ? (
        <Button color="red" basic onClick={() => setError(null)}>
          {String(error)}
        </Button>
      ) : null}

      <Container>
        <Card>
          <Card.Content>
            <Card.Header>{voucher.name}</Card.Header>
            <Card.Meta>{voucher.variant}</Card.Meta>
          </Card.Content>
          <Card.Content extra>
            <Card.Meta>Price: {voucher.price}</Card.Meta>
            <Card.Meta>Quantity: {voucher.quantity}</Card.Meta>
          </Card.Content>
        </Card>

        <div>
          <div>Select amount:</div>

          <Input
            value={amount}
            onChange={(e) => setAmount(Math.round(Number(e.currentTarget.value)) || 1)}
          />

          <Button onClick={order}>BOOK</Button>
        </div>
      </Container>
    </div>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;

  @media (min-width: 813px) {
    grid-template-columns: auto 1fr;
  }
`
