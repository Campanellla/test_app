import React from "react";
import { useQuery } from "@apollo/client";
import styled from "styled-components";

import listVouchers from "src/graphql/query/listVouchers.graphql";
import VoucherCard from "src/components/VoucherCard";

const List = () => {
  const { loading, data, error } = useQuery(listVouchers);

  if (loading) return <div>loading</div>;

  const vouchers = data?.listVouchers;

  if (!vouchers || error) return <div>Get appartments error</div>;

  return (
    <div>
      Vouchers:
      <Container>
        {vouchers.map((voucher) => (
          <VoucherCard voucher={voucher} key={voucher.id} />
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
