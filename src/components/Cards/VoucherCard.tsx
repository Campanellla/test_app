import React from 'react'
import { Card, Image, Button } from 'semantic-ui-react'
import CurrentUserContext from 'src/lib/context'

import Router from 'next/router'

import type { Voucher } from 'src/types'

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

const AppartmentCard: React.FC<{ voucher?: Voucher | null }> = ({ voucher }) => {
  const currentUser = React.useContext(CurrentUserContext)

  if (!voucher) return null

  const order = () => Router.push(`/order?voucher=${voucher.id}`)
  const edit = () => Router.push(`/edit?voucher=${voucher.id}`)

  const owner = currentUser?.type === 'seller' // currentUser?.id && currentUser.id === appartment.owner;

  return (
    <Card>
      <Image src={getVoucherImage(voucher.variant)} style={{ maxHeight: '100%' }} />

      <Card.Content>
        <Card.Header>{voucher.name}</Card.Header>
        <Card.Meta>{voucher.variant}</Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Card.Meta>Price: {voucher.price}</Card.Meta>
        <Card.Meta>Quantity: {voucher.quantity}</Card.Meta>
        {currentUser?.id ? (
          <Card.Meta>
            <Button style={{ width: '100%' }} onClick={owner ? edit : order}>
              {owner ? 'Edit' : 'Order'}
            </Button>
          </Card.Meta>
        ) : null}
      </Card.Content>
    </Card>
  )
}

export default AppartmentCard
