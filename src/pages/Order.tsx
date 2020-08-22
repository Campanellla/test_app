import React from "react";
import Header from "src/components/Header";

export default function Order({ id }) {
  console.log(id);

  return (
    <div>
      <Header />
      ORDER: {id}
    </div>
  );
}
