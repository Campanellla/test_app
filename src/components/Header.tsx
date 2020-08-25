import React from 'react'

import currentUserContext from 'src/lib/context'

import { Button } from 'semantic-ui-react'
import Router from 'next/router'
import styled from 'styled-components'

export default function Header() {
  const currentUser = React.useContext(currentUserContext)

  const [dropdown, setDropdown] = React.useState(false)

  return (
    <>
      <HeaderContainer>
        <Button onClick={() => Router.push('/signin')}>Sign In</Button>
        <Button onClick={() => Router.push('/signup')}>Sign Up</Button>
        <Button onClick={() => Router.push('/')}>Main</Button>
        <Button onClick={() => Router.push('/profile')}>Profile</Button>
        <div></div>

        {currentUser?.id ? (
          <div>
            <div>Email: {currentUser.email}</div>
            <div>Name: {`${currentUser.firstName} ${currentUser.lastName}`}</div>
          </div>
        ) : null}
      </HeaderContainer>

      <MobileBar>
        <div>User: {currentUser.email}</div>

        <Button basic onClick={() => setDropdown(!dropdown)}>
          ☰
        </Button>
      </MobileBar>
      {dropdown ? (
        <MobileDropdown>
          <Button onClick={() => Router.push('/signin')}>Sign In</Button>
          <Button onClick={() => Router.push('/signup')}>Sign Up</Button>
          <Button onClick={() => Router.push('/')}>Main</Button>
          <Button onClick={() => Router.push('/profile')}>Profile</Button>
        </MobileDropdown>
      ) : null}
    </>
  )
}

const HeaderContainer = styled.div`
  background-color: rgb(250, 250, 250);
  position: sticky;
  top: 0;
  z-index: 100;

  display: none;
  grid-template-columns: auto auto auto auto 1fr auto;

  @media (min-width: 813px) {
    display: grid;
  }
`

const MobileBar = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  padding: 0.25rem;
  background-color: rgba(0, 0, 0, 0.05);

  @media (min-width: 813px) {
    display: none;
  }
`

const MobileDropdown = styled.div`
  display: grid;
  grid-auto-flow: row;
  padding: 0.25rem;
  background-color: rgba(0, 0, 0, 0.05);

  gap: 0.25rem;

  @media (min-width: 813px) {
    display: none;
  }
`
