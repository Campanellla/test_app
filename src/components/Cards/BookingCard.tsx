import React from 'react'
import { Card, Image } from 'semantic-ui-react'

import type { Booking } from 'src/types'

import getBookingSchema from 'src/graphql/query/getBooking.graphql'
import { useQuery } from '@apollo/client'

const BookingCard: React.FC<{ booking?: Booking | null }> = ({ booking }) => {
  if (!booking) return null

  const { loading, data, error } = useQuery(getBookingSchema, { variables: { id: booking.id } })

  if (loading) return <div>loading</div>

  if (error) return <div>{String(error?.message)}</div>

  const appartment = data?.getBooking?.appartment
  const timeSlot = data?.getBooking?.timeSlot
  const buyer = data?.getBooking?.buyer

  if (!timeSlot?.id || !appartment?.id) return null

  return (
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

      <Card.Content extra>
        <Card.Meta>Time: {`${timeSlot.start}->${timeSlot.end}`}</Card.Meta>
        <Card.Meta>
          Buyer: {buyer.firstName} {buyer.firstName}
        </Card.Meta>
      </Card.Content>
    </Card>
  )
}

export default BookingCard
