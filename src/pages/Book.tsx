import React from "react";
import Header from "src/components/Header";

import { useQuery, useMutation } from "@apollo/client";

import getAppartmentSchema from "src/graphql/query/getAppartment.graphql";
// import makeBookingSchema from "src/graphql/mutation/makeBooking.graphql";

const makeBookingSchema = {};

import { Loader, Card, Image, Button } from "semantic-ui-react";

import styled from "styled-components";

export default function Book({ id = "" }) {
  const { loading, data, error } = useQuery(getAppartmentSchema, {
    variables: { id },
  });

  const [makeBooking] = useMutation(makeBookingSchema);

  const book = () => {
    const input = {};

    makeBooking({ variables: { input } });
  };

  if (loading)
    return (
      <div>
        <Header />
        <Loader active>Loading</Loader>
      </div>
    );

  const appartment = data.getAppartment;

  if (error || !appartment)
    return (
      <div>
        <Header />
        Error: {error ? error.message : "no appartment exist"}
      </div>
    );

  return (
    <div>
      <Header />
      BOOK: {id}
      <Container>
        <Card>
          <Image src={appartment.image} style={{ maxHeight: "100%" }} />

          <Card.Content>
            <Card.Header>{appartment.name}</Card.Header>
            <Card.Meta>{appartment.description}</Card.Meta>
          </Card.Content>

          <Card.Content extra>
            <Card.Meta>Price: {appartment.price}</Card.Meta>
            <Card.Meta>Rooms: {appartment.rooms}</Card.Meta>
          </Card.Content>
        </Card>

        <div>
          <div>Select time:</div>
          <Button>BOOK</Button>
        </div>
      </Container>
    </div>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
`;
