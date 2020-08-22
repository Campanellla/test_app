import React from "react";

import AddAppartment from "src/components/AddAppartment";
import AddVoucher from "src/components/AddVoucher";

import Header from "src/components/Header";

export default function ADD() {
  return (
    <div>
      <Header />

      <AddAppartment />
      <AddVoucher />
    </div>
  );
}
