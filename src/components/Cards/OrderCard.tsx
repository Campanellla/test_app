import React from 'react'
import { Card, Image } from 'semantic-ui-react'

import type { Order } from 'src/types'

const getVoucherImage = (variant: string) => {
  switch (variant) {
    case 'restaurant':
      return 'https://media.istockphoto.com/photos/blurred-background-of-restaurant-interior-picture-id624546890?k=6&m=624546890&s=612x612&w=0&h=8N4_vwGoS0hzlw2A_SaaJlyMEVmi-H8k1jPF2ZG38H0='
    case 'club':
      return 'https://media.istockphoto.com/photos/head-is-swimming-on-dance-floor-picture-id486420378?k=6&m=486420378&s=612x612&w=0&h=zkrKfZ0LJwSjzxM5SNMTjwbCRCx-kF_QJTEdYZHSRag='
    case 'museum':
      return 'http://exuberantindia.com/wp-content/uploads/2015/08/museum.png'
    case 'cinema':
      return 'https://images.clipartof.com/small/1158334-Clipart-Of-A-Cinema-Building-Facade-Royalty-Free-Vector-Illustration.jpg'
    default:
      return 'https://clipground.com/images/gift-voucher-clipart-free-16.jpg'
  }
}

const OrderCard: React.FC<{ order?: Order | null }> = ({ order }) => {
  if (!order) return null

  const voucher = order?.voucher
  const amount = order?.amount
  const buyer = order.buyer

  if (!voucher?.id) return null

  return (
    <Card>
      <Image src={getVoucherImage(voucher?.variant)} style={{ maxHeight: '100%' }} />

      <Card.Content>
        <Card.Header>{voucher?.name}</Card.Header>
        <Card.Meta>{voucher?.variant}</Card.Meta>
      </Card.Content>

      <Card.Content extra>
        <Card.Meta>Price: {voucher?.price}</Card.Meta>
        <Card.Meta>Amount: {amount}</Card.Meta>
      </Card.Content>

      <Card.Content extra>
        <Card.Meta>
          Buyer: {order?.buyer?.firstName} {order?.buyer?.firstName}
        </Card.Meta>
      </Card.Content>
    </Card>
  )
}

export default OrderCard