import React from "react";
import styled from "styled-components";

import Header from "src/components/Header";
import CurrentUserContext from "src/lib/context";

import AddAppartment from "src/components/AddAppartment";
import AddVoucher from "src/components/AddVoucher";

import AppartmentCard from "src/components/AppartmentCard";
import VoucherCard from "src/components/VoucherCard";

export default function Profile() {
  const currentUser = React.useContext(CurrentUserContext);

  if (currentUser == null) return <div>Page not found</div>;

  if (!currentUser.id) return <div>Loading</div>;

  return (
    <div>
      <Header />

      <ListContainer>
        {currentUser.appartments?.map((appartment) => (
          <AppartmentCard appartment={appartment} key={appartment.id} />
        ))}

        {currentUser.vouchers?.map((voucher) => (
          <VoucherCard voucher={voucher} key={voucher.id} />
        ))}
      </ListContainer>

      <InputsContainer>
        <AddAppartment />
        <AddVoucher />
      </InputsContainer>
    </div>
  );
}

const InputsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-items: center;
`;

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  grid-gap: 0.5rem;
  justify-items: center;

  > .ui.card {
    margin: 0;
  }
`;
