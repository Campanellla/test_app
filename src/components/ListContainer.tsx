import React from 'react'
import styled from 'styled-components'

const ListContainer = styled.div`
  margin: 1rem 0.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, auto));
  grid-gap: 1rem;
  justify-items: center;

  > .ui.card {
    margin: 0;
  }
`

export default ListContainer
