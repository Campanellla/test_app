import React from "react";
import { Card, Image, Button } from "semantic-ui-react";
import CurrentUserContext from "src/lib/context";

import Router from "next/router";

const AppartmentCard = ({ voucher }) => {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <Card>
      <Card.Content>
        <Card.Header>{voucher.name}</Card.Header>
        <Card.Meta>{voucher.variant}</Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Card.Meta>Price: {voucher.price}</Card.Meta>
        {currentUser?.id ? (
          <Card.Meta>
            <Button onClick={() => Router.push(`/order?voucher=${voucher.id}`)}>
              Order
            </Button>
          </Card.Meta>
        ) : null}
      </Card.Content>
    </Card>
  );
};

export default AppartmentCard;
