import React from 'react'
import { useQuery } from '@apollo/client'
import listItems from 'src/graphql/query/listItems.graphql'

import AppartmentCard from 'src/components/Cards/AppartmentCard'
import VoucherCard from 'src/components/Cards/VoucherCard'

import { Dropdown, Button, Input, Checkbox } from 'semantic-ui-react'

import { useRouter } from 'next/router'

import DatePicker from 'react-datepicker'

export default function Main() {
  const router = useRouter()

  const { pathname, query } = router

  const sortObject = {}
  if (query.type === 'appartments' || query.type === 'vouchers') sortObject.type = query.type

  if (Number(query.pricestart) > 0) sortObject.pricestart = query.pricestart
  if (Number(query.priceend) > 0) sortObject.priceend = query.priceend

  if (query.datestart) sortObject.datestart = query.datestart
  if (query.dateend) sortObject.dateend = query.dateend

  if (Number(query.rooms) > 0) sortObject.rooms = query.rooms

  const { loading, data, error } = useQuery(listItems, {
    variables: { sort: JSON.stringify(sortObject) },
  })

  const [type, setType] = React.useState(sortObject.type || 'all')

  const [priceStart, setPriceStart] = React.useState(null)
  const [priceEnd, setPriceEnd] = React.useState(null)

  const [dateStart, setDateStart] = React.useState(new Date())
  const [dateEnd, setDateEnd] = React.useState(new Date())
  const [rooms, setRooms] = React.useState(null)

  const [timeFilter, setTimeFilter] = React.useState(false)

  if (loading) return <div>loading</div>

  const items = data?.listItems

  if (error) return <div>Get appartments error</div>

  const filter = () => {
    const query = {}

    if (type) query.type = type
    if (priceStart > 0) query.pricestart = priceStart
    if (priceEnd > 0) query.priceend = priceEnd

    if (dateStart && timeFilter) query.datestart = dateStart.toISOString()
    if (dateEnd && timeFilter) query.dateend = dateEnd.toISOString()
    if (rooms) query.rooms = rooms

    const href = `${pathname}?${new URLSearchParams(query).toString()}`

    router.push(href)
  }

  return (
    <div>
      <Dropdown
        selection
        value={type}
        options={[
          {
            key: 'all',
            text: 'all',
            value: 'all',
          },
          {
            key: 'appartments',
            text: 'appartments',
            value: 'appartments',
          },
          {
            key: 'vouchers',
            text: 'vouchers',
            value: 'vouchers',
          },
        ]}
        onChange={(_, e) => setType(e.value as string)}
      />

      <Input
        type="number"
        value={priceStart}
        onChange={(e) => setPriceStart(e.currentTarget.value)}
      />

      <Input type="number" value={priceEnd} onChange={(e) => setPriceEnd(e.currentTarget.value)} />

      <Input type="number" value={rooms} onChange={(e) => setRooms(e.currentTarget.value)} />

      <div>
        <Checkbox
          checked={timeFilter}
          label="filter by time range"
          onChange={(_, e) => setTimeFilter(e.checked)}
        />
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

      <Button onClick={filter}> Filter </Button>

      {items.map((item) => {
        if (item?.appartment)
          return <AppartmentCard appartment={item.appartment} key={item.appartment.id} />
        if (item?.voucher) return <VoucherCard voucher={item.voucher} key={item.voucher.id} />

        return null
      })}
    </div>
  )
}
