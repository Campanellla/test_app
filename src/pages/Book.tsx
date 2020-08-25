import React from 'react'
import Header from 'src/components/Header'

import { useQuery, useMutation } from '@apollo/client'

import getAppartmentSchema from 'src/graphql/query/getAppartment.graphql'
import makeBookingSchema from 'src/graphql/mutation/makeBooking.graphql'

import { Loader, Card, Image, Button } from 'semantic-ui-react'

import styled from 'styled-components'

export default function Book({ id = '' }) {
  const { loading, data, error } = useQuery(getAppartmentSchema, {
    variables: { id },
  })

  const [current, setCurrent] = React.useState(0)

  const [makeBooking] = useMutation(makeBookingSchema)

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

  if (error || !appartment)
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
          />

          <Button onClick={book}>BOOK</Button>
        </div>
      </Container>
    </div>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
`

const TimeSelector = ({ timeSlots, current, onSelect }) => (
  <div>
    {timeSlots.map((slot, i: number) => (
      <div
        style={i === current ? { backgroundColor: 'rgba(0,0,0,0.1)' } : undefined}
        onClick={() => onSelect(i)}
      >
        {`${new Date(slot.start).toLocaleString()} -> ${new Date(slot.end).toLocaleString()}`}
      </div>
    ))}
  </div>
)
