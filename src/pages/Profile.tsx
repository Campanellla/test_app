import React from 'react'
import styled from 'styled-components'

import Header from 'src/components/Header'
import CurrentUserContext from 'src/lib/context'

import AppartmentCard from 'src/components/Cards/AppartmentCard'
import VoucherCard from 'src/components/Cards/VoucherCard'
import { Button } from 'semantic-ui-react'

import Router from 'next/router'

import BookingCard from 'src/components/Cards/BookingCard'
import OrderCard from 'src/components/Cards/OrderCard'

export default function Profile() {
  const currentUser = React.useContext(CurrentUserContext)

  if (currentUser == null) return <div>Page not found</div>
  if (!currentUser.id) return <div>Loading</div>

  return (
    <div>
      <Header />

      {currentUser.type === 'seller' ? (
        <>
          <InputsContainer>
            <Button onClick={() => Router.push('/add?appartment')}>Add appartment</Button>
            <Button onClick={() => Router.push('/add?voucher')}>Add voucher</Button>
          </InputsContainer>

          <ListContainer>
            {currentUser.appartments?.map((appartment) => (
              <AppartmentCard appartment={appartment} key={appartment?.id} />
            ))}

            {currentUser.vouchers?.map((voucher) => (
              <VoucherCard voucher={voucher} key={voucher?.id} />
            ))}
          </ListContainer>
        </>
      ) : null}

      <ListContainer>
        {currentUser.bookings?.map((booking) => (
          <BookingCard booking={booking} />
        ))}

        {currentUser.orders?.map((order) => (
          <OrderCard order={order} />
        ))}
      </ListContainer>
    </div>
  )
}

const InputsContainer = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-items: center;
`

const ListContainer = styled.div`
  margin: 1rem 0.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, auto));
  grid-gap: 1rem;
  justify-items: center;

  > .ui.card {
    margin: 0;
  }
`
