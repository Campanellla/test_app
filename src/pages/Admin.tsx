import React from 'react'
import styled from 'styled-components'

import Header from 'src/components/Header'
import CurrentUserContext from 'src/lib/context'

import AppartmentCard from 'src/components/Cards/AppartmentCard'

import ListContainer from 'src/components/ListContainer'

import { Button, Input } from 'semantic-ui-react'

import { useLazyQuery } from '@apollo/client'
import getAdminReportSchema from 'src/graphql/query/getAdminReport.graphql'

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
  const [runQuery, { loading, data, error }] = useLazyQuery(getAdminReportSchema)

  const [dateStart, setDateStart] = React.useState(new Date())
  const [dateEnd, setDateEnd] = React.useState(new Date())

  if (loading) return <div>loading</div>

  const items = data?.getAdminReport

  if (error) return <div>Get appartments error</div>

  const runReport = () => {
    const query = {}

    if (dateStart) query.datestart = dateStart.toISOString()
    if (dateEnd) query.dateend = dateEnd.toISOString()

    runQuery({ variables: { sort: JSON.stringify(query) } })
  }

  return (
    <div>
      Rooms:
      <div>
        <div>Start time:</div>
        <DatePicker
          selected={dateStart}
          onChange={(date) => setDateStart(date)}
          timeInputLabel="Time start:"
          dateFormat="MM/dd/yyyy h:mm aa"
          showTimeInput
          timeIntervals={60}
          showTimeSelect
        />
        <div>End time:</div>
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
      <div>
        {items?.map(({ rooms, unbooked }: { rooms?: number; unbooked?: number } = {}) => {
          if (rooms)
            return (
              <div>
                {`${rooms} room${rooms > 1 ? 's' : ''} - ${unbooked} appartment${
                  (unbooked || 0) > 1 ? 's' : ''
                } unbooked `}
              </div>
            )

          return null
        })}
      </div>
    </div>
  )
}
