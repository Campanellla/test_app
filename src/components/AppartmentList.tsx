import React from "react";
import { useQuery } from "@apollo/client";
import listAppartments from "src/graphql/query/listAppartments.graphql";
import AppartmentCard from "src/components/AppartmentCard";

import styled from "styled-components";

const List = () => {
  const { loading, data, error } = useQuery(listAppartments);

  if (loading) return <div>loading</div>;

  const appartments = data?.listAppartments;

  if (!appartments || error) return <div>Get appartments error</div>;

  return (
    <div>
      Appartments:
      <Container>
        {appartments.map((appartment) => (
          <AppartmentCard appartment={appartment} key={appartment.id} />
        ))}
      </Container>
    </div>
  );
};

export default List;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  grid-gap: 0.5rem;
  justify-items: center;

  > .ui.card {
    margin: 0;
  }
`;
