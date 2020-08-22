import React from "react";
import { useMutation, useQuery } from "@apollo/client";

import addAppartmentMutation from "src/graphql/mutation/addAppartment.graphql";
import getAppartmentSchema from "src/graphql/query/getAppartment.graphql";
import styled from "styled-components";

import DatePicker from "react-datepicker";
import { Input, Button } from "semantic-ui-react";

export default function ADD({ appartment }) {
  const [addAppartment] = useMutation(addAppartmentMutation, {
    onCompleted: (e) => console.log(e),
    onError: (e) => console.log("err:", e),
  });

  const { loading, data, edit } = useQuery(getAppartmentSchema, {
    variables: { id: appartment.id },
  });

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [image, setImage] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [rooms, setRooms] = React.useState(0);

  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());

  const [timeslots, setTimeSlots] = React.useState<
    [
      {
        start: string;
        end: string;
      }
    ]
  >([]);

  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  const setTimeSlot = () => {
    if (startDate >= endDate) {
      setError("end time should be higher than start time");
      return;
    }

    const start = startDate.toISOString();
    const end = endDate.toISOString();

    timeslots.push({ start, end });

    setTimeSlots([...timeslots]);
  };

  const addApp = () => {
    if (!name || !image || !price || !rooms) {
      setError("name image price rooms are required fields");
      return;
    }

    if (price <= 0 || rooms <= 0) {
      setError("price rooms are must be higher than zero");
      return;
    }

    if (!timeslots.length) {
      setError("appartment should have at least one slot");
      return;
    }

    addAppartment({
      variables: {
        input: { name, description, image, price, rooms, timeSlots: timeslots },
      },
    });
  };

  return (
    <Container>
      <div className="header">Add Appartment:</div>

      {success ? (
        <Button color="green" basic onClick={() => setSuccess(false)}>
          You added appartment sucessfully
        </Button>
      ) : null}

      {error ? (
        <Button color="red" basic onClick={() => setError(null)}>
          {error}
        </Button>
      ) : null}

      <Input
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.currentTarget.value || "")}
      />
      <Input
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.currentTarget.value || "")}
      />
      <Input
        placeholder="image url"
        value={image}
        onChange={(e) => setImage(e.currentTarget.value || "")}
      />
      <Input
        placeholder="price"
        value={price}
        type="number"
        onChange={(e) => setPrice(Number(e.currentTarget.value || 0))}
      />
      <Input
        placeholder="rooms"
        value={rooms}
        type="number"
        onChange={(e) =>
          setRooms(Math.round(Number(e.currentTarget.value || 0)))
        }
      />

      <div>{JSON.stringify(timeslots)}</div>

      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        timeInputLabel="Time start:"
        dateFormat="MM/dd/yyyy h:mm aa"
        showTimeInput
        timeIntervals={60}
        showTimeSelect
      />

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

      <Button onClick={setTimeSlot}>add time</Button>

      <Button onClick={addApp}>Create Appartment</Button>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-auto-rows: 1fr;
  max-width: 25rem;
  gap: 0.25rem;
  width: 100%;

  &&& > button {
    margin: 0;
  }

  > .header {
    text-align: center;
  }
`;
