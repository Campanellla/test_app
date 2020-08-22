import React from "react";
import { Card, Image, Button } from "semantic-ui-react";
import CurrentUserContext from "src/lib/context";

import Router from "next/router";

const AppartmentCard = ({ appartment }) => {
  const currentUser = React.useContext(CurrentUserContext);

  const book = () => Router.push(`/book?appartment=${appartment.id}`);
  const edit = () => Router.push(`/edit?appartment=${appartment.id}`);

  const owner = currentUser?.type === "seller"; // currentUser?.id && currentUser.id === appartment.owner;

  return (
    <Card>
      <Image src={appartment.image} style={{ maxHeight: "100%" }} />

      <Card.Content>
        <Card.Header>{appartment.name}</Card.Header>
        <Card.Meta>{appartment.description}</Card.Meta>
      </Card.Content>

      <Card.Content extra>
        <Card.Meta>Price: {appartment.price}</Card.Meta>
        <Card.Meta>Rooms: {appartment.rooms}</Card.Meta>
        {currentUser?.id ? (
          <Card.Meta>
            <Button onClick={owner ? edit : book}>
              {owner ? "Edit" : "Book"}
            </Button>
          </Card.Meta>
        ) : null}
      </Card.Content>
    </Card>
  );
};

export default AppartmentCard;
