import React from 'react'
import Header from 'src/components/Header'

import { useQuery, useMutation } from '@apollo/client'

import getAppartmentSchema from 'src/graphql/query/getAppartment.graphql'
import makeBookingSchema from 'src/graphql/mutation/makeBooking.graphql'

import { Loader, Card, Image, Button } from 'semantic-ui-react'

import styled from 'styled-components'

export default function Book({ id = '' }) {
  const { loading, data, error: apolloError } = useQuery(getAppartmentSchema, {
    variables: { id },
  })

  const [current, setCurrent] = React.useState(0)
  const [error, setError] = React.useState<string | null>(null)
  const [success, setSuccess] = React.useState(false)

  const [makeBooking] = useMutation(makeBookingSchema, {
    refetchQueries: [{ query: getAppartmentSchema, variables: { id } }],
    onCompleted: () => setSuccess(true),
    onError: (e) => setError(e.message),
  })

  if (loading)
    return (
      <div>
        <Header />
        <Loader active>Loading</Loader>
      </div>
    )

  const appartment = data?.getAppartment

  const book = () => {
    const input = {
      appartmentID: appartment.id,
      timeSlot: appartment.timeSlots[current].id,
    }

    makeBooking({ variables: { input } })
  }

  if (apolloError || !appartment)
    return (
      <div>
        <Header />
        Error: {error ? error.message : 'no appartment exist'}
      </div>
    )

  return (
    <div>
      <Header />

      {success ? (
        <Button color="green" basic onClick={() => setSuccess(false)}>
          You booked appartment sucessfully
        </Button>
      ) : null}

      {error ? (
        <Button color="red" basic onClick={() => setError(null)}>
          {String(error)}
        </Button>
      ) : null}

      <Container>
        <Card>
          <Image src={appartment.image} style={{ maxHeight: '100%' }} />

          <Card.Content>
            <Card.Header>{appartment.name}</Card.Header>
            <Card.Meta>{appartment.description}</Card.Meta>
          </Card.Content>

          <Card.Content extra>
            <Card.Meta>Price: {appartment.price}</Card.Meta>
            <Card.Meta>Rooms: {appartment.rooms}</Card.Meta>
          </Card.Content>
        </Card>

        <div>
          <div>Select time slot:</div>

          <TimeSelector
            timeSlots={appartment.timeSlots}
            onSelect={(i) => setCurrent(i)}
            current={current}
            hideSelected
          />

          <Button onClick={book}>BOOK</Button>
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

const TimeSelector = ({ timeSlots, current, onSelect, hideSelected }) => (
  <div>
    {timeSlots.map((slot, i: number) => {
      if (slot.booking?.id) return null

      return (
        <div
          style={i === current ? { backgroundColor: 'rgba(0,0,0,0.1)' } : undefined}
          onClick={() => onSelect(i)}
        >
          {`${new Date(slot.start).toLocaleString()} -> ${new Date(slot.end).toLocaleString()}`}
        </div>
      )
    })}
  </div>
)
