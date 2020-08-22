import AppartmentList from "src/components/AppartmentList";
import VoucherList from "src/components/VoucherList";

import React from "react";
import { useQuery } from "@apollo/client";
import listAppartments from "src/graphql/query/listAppartments.graphql";
import AppartmentCard from "src/components/AppartmentCard";

import listItems from "src/graphql/query/listItems.graphql";

import styled from "styled-components";

export default function Main() {
  const { loading, data, error } = useQuery(listItems);

  if (loading) return <div>loading</div>;

  const appartments = data?.listAppartments;
  const vouchers = data?.listVouchers;

  if (!appartments || error) return <div>Get appartments error</div>;

  return (
    <div>
      <select>
        <option>all</option>
        <option>appartments</option>
        <option>vouchers</option>
      </select>

      <AppartmentList />
      <VoucherList />
    </div>
  );
}
