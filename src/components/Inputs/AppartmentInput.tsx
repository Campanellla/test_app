import React from 'react'

import styled from 'styled-components'

import DatePicker from 'react-datepicker'
import { Input, Button } from 'semantic-ui-react'

export default function AppartmentInput({
  onAction,
  error,
  success,
  resetState,

  name,
  description,
  image,
  price,
  rooms,
  timeSlots,

  edit,
}) {
  const [_name, setName] = React.useState(name || '')
  const [_description, setDescription] = React.useState(description || '')
  const [_image, setImage] = React.useState(image || '')
  const [_price, setPrice] = React.useState(price || 0)
  const [_rooms, setRooms] = React.useState(rooms || 0)

  const [startDate, setStartDate] = React.useState(new Date())
  const [endDate, setEndDate] = React.useState(new Date())

  const [_timeSlots, setTimeSlots] = React.useState<
    [
      {
        start: string
        end: string
      }
    ]
  >(timeSlots || [])

  const setTimeSlot = () => {
    if (startDate >= endDate) {
      resetState('end time should be higher than start time')
      return
    }

    const start = startDate.toISOString()
    const end = endDate.toISOString()

    _timeSlots.push({ start, end })

    setTimeSlots([..._timeSlots])
  }

  return (
    <Container>
      <div className="header">Add Appartment:</div>

      {success ? (
        <Button color="green" basic onClick={resetState}>
          You added appartment sucessfully
        </Button>
      ) : null}

      {error ? (
        <Button color="red" basic onClick={resetState}>
          {String(error)}
        </Button>
      ) : null}

      <Input placeholder="name" value={_name} onChange={(e) => setName(e.currentTarget.value)} />
      <Input
        placeholder="description"
        value={_description}
        onChange={(e) => setDescription(e.currentTarget.value)}
      />
      <Input
        placeholder="image url"
        value={_image}
        onChange={(e) => setImage(e.currentTarget.value)}
      />
      <Input
        placeholder="price"
        value={_price}
        type="number"
        onChange={(e) => setPrice(Number(e.currentTarget.value) || 0)}
      />
      <Input
        placeholder="rooms"
        value={_rooms}
        type="number"
        onChange={(e) => setRooms(Math.round(Number(e.currentTarget.value) || 0))}
      />

      <TimeSelector
        timeSlots={_timeSlots}
        current={0}
        onSelect={() => {
          return
        }}
      />
      <div>
        Start time:
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          timeInputLabel="Time start:"
          dateFormat="MM/dd/yyyy h:mm aa"
          showTimeInput
          timeIntervals={60}
          showTimeSelect
        />
        End time:
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          timeInputLabel="Time end:"
          dateFormat="MM/dd/yyyy h:mm aa"
          showTimeInput
          timeIntervals={60}
          showTimeSelect
          minDate={startDate}
        />
      </div>
      <Button onClick={setTimeSlot}>add time</Button>

      <Button
        onClick={() =>
          onAction({
            name: _name,
            description: _description,
            image: _image,
            price: _price,
            rooms: _rooms,
            timeSlots: _timeSlots,
          })
        }
      >
        {edit ? 'Edit Appartment' : 'Create Appartment'}
      </Button>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-auto-rows: auto;
  max-width: 45rem;
  gap: 1rem;
  width: 100%;
  margin: auto;

  &&& > button {
    margin: 0;
  }

  > .header {
    text-align: center;
  }
`

const TimeSelector = ({ timeSlots, current, onSelect }) => (
  <div>
    {timeSlots.map((slot, i: number) => (
      <div
        style={i === current ? { backgroundColor: 'rgba(0,0,0,0.1)' } : undefined}
        onClick={() => onSelect(i)}
      >
        {`${new Date(slot.start).toLocaleString()} -> ${new Date(slot.end).toLocaleString()}`}
      </div>
    ))}
  </div>
)
