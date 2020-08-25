import React from 'react'
import { Card, Image } from 'semantic-ui-react'

import type { Booking } from 'src/types'

const BookingCard: React.FC<{ booking?: Booking | null }> = ({ booking }) => {
  if (!booking) return null

  const appartment = booking?.appartment
  const timeSlot = booking?.timeSlot

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
          Buyer: {booking.buyer.firstName} {booking.buyer.firstName}
        </Card.Meta>
      </Card.Content>
    </Card>
  )
}

export default BookingCard
