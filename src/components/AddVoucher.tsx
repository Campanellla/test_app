import React from "react";
import { useMutation } from "@apollo/client";
import { Input, Button } from "semantic-ui-react";
import styled from "styled-components";

import addVoucherMutation from "src/graphql/mutation/addVoucher.graphql";
import currentUserSchema from "src/graphql/query/currentUser.graphql";

export default function ADD() {
  const [addVoucher] = useMutation(addVoucherMutation, {
    refetchQueries: [{ query: currentUserSchema }],
    onCompleted: (e) => console.log(e),
    onError: (e) => console.log("err:", e),
  });

  const [name, setName] = React.useState("");
  const [variant, setVariant] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [quantity, setQuantity] = React.useState(0);

  return (
    <Container>
      <div>Add Voucher:</div>
      <Input
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.currentTarget.value || "")}
      />
      <Input
        placeholder="variant"
        value={variant}
        onChange={(e) => setVariant(e.currentTarget.value || "")}
      />
      <Input
        placeholder="price"
        value={price}
        type="number"
        onChange={(e) => setPrice(Number(e.currentTarget.value || 0))}
      />
      <Input
        placeholder="quantity"
        value={quantity}
        type="number"
        onChange={(e) => setQuantity(Number(e.currentTarget.value || 0))}
      />
      <Button
        onClick={() => {
          addVoucher({
            variables: {
              input: { name, variant, price, quantity },
            },
          });
        }}
      >
        Create
      </Button>
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
