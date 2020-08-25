import React from 'react'
import Header from 'src/components/Header'

import { useQuery, useMutation } from '@apollo/client'

import getVoucherSchema from 'src/graphql/query/getVoucher.graphql'
import makeOrderSchema from 'src/graphql/mutation/makeOrder.graphql'

import { Loader, Card, Button, Input } from 'semantic-ui-react'

import styled from 'styled-components'

export default function Order({ id = '' }) {
  const { loading, data, error } = useQuery(getVoucherSchema, {
    variables: { id },
  })

  const [amount, setAmount] = React.useState(1)

  const voucher = data?.getVoucher

  const [makeOrder] = useMutation(makeOrderSchema)

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

  if (error || !voucher)
    return (
      <div>
        <Header />
        Error: {error ? error.message : 'no appartment exist'}
      </div>
    )

  return (
    <div>
      <Header />

      <Container>
        <Card>
          <Card.Content>
            <Card.Header>{voucher.name}</Card.Header>
            <Card.Meta>{voucher.variant}</Card.Meta>
          </Card.Content>
          <Card.Content extra>
            <Card.Meta>Price: {voucher.price}</Card.Meta>
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
  grid-template-columns: auto 1fr;
`
