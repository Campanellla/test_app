import React from 'react'
import styled from 'styled-components'

import Header from 'src/components/Header'
import CurrentUserContext from 'src/lib/context'

import AppartmentCard from 'src/components/Cards/AppartmentCard'

import ListContainer from 'src/components/ListContainer'

import { Button, Input } from 'semantic-ui-react'

import { useLazyQuery } from '@apollo/client'
import listItems from 'src/graphql/query/listItems.graphql'

import DatePicker from 'react-datepicker'

export default function Admin() {
  const currentUser = React.useContext(CurrentUserContext)

  if (currentUser == null) return <div>Page not found</div>
  if (!currentUser.id) return <div>Loading</div>
  if (currentUser.type !== 'admin') return <div>Page not found</div>

  return (
    <div>
      <Header />

      <ListContainer>
        <MakeReport />
      </ListContainer>
    </div>
  )
}

const MakeReport = () => {
  const [runQuery, { loading, data, error }] = useLazyQuery(listItems)

  const [dateStart, setDateStart] = React.useState(new Date())
  const [dateEnd, setDateEnd] = React.useState(new Date())
  const [rooms, setRooms] = React.useState(null)

  if (loading) return <div>loading</div>

  const items = data?.listItems

  if (error) return <div>Get appartments error</div>

  const runReport = () => {
    const query = {}

    query.type = 'appatrments'

    if (dateStart) query.datestart = dateStart.toISOString()
    if (dateEnd) query.dateend = dateEnd.toISOString()
    if (rooms) query.rooms = rooms

    query.unBooked = true
    query.descending = true

    runQuery({ variables: { sort: JSON.stringify(query) } })
  }

  return (
    <div>
      Rooms:
      <Input type="number" value={rooms} onChange={(e) => setRooms(e.currentTarget.value)} />
      <div>
        Start time:
        <DatePicker
          selected={dateStart}
          onChange={(date) => setDateStart(date)}
          timeInputLabel="Time start:"
          dateFormat="MM/dd/yyyy h:mm aa"
          showTimeInput
          timeIntervals={60}
          showTimeSelect
        />
        End time:
        <DatePicker
          selected={dateEnd}
          onChange={(date) => setDateEnd(date)}
          timeInputLabel="Time end:"
          dateFormat="MM/dd/yyyy h:mm aa"
          showTimeInput
          timeIntervals={60}
          showTimeSelect
          minDate={dateStart}
        />
      </div>
      <Button onClick={runReport}> Show </Button>
      <ListContainer>
        {items?.map((item) => {
          if (item?.appartment)
            return <AppartmentCard appartment={item.appartment} key={item.appartment.id} />

          return null
        })}
      </ListContainer>
    </div>
  )
}
