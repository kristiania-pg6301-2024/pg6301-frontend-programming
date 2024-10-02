import { Settlement, sumBalance } from "../../../../src/cashBalance";
import { Link } from "react-router-dom";
import React from "react";

interface Props {
  settlements: Settlement[];
}

export function ListSettlements({ settlements }: Props) {
  return (
    <>
      <h1>Settlements</h1>
      {settlements.map(({ _id, department, balance }) => (
        <div key={_id}>
          {department}: {sumBalance(balance)} kr
        </div>
      ))}
      <Link to={"/new"}>New Settlement</Link>
    </>
  );
}
