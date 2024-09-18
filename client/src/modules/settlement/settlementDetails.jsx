import { useParams } from "react-router-dom";
import React from "react";
import {sumBalance} from "./money";

export function SettlementDetails({ settlements }) {
  const { id } = useParams();
  const settlement = settlements.find((s) => s.id == id);

  if (!settlement) return <h1>Not found</h1>;

  const { selectedDepartment, balance } = settlement;

  return (
    <>
      <h1>
        Du ser nå på settlement {id}: {selectedDepartment}
      </h1>
      <pre>{JSON.stringify(balance, null, 2)}</pre>
        <div>Total is: {sumBalance(balance)}</div>
    </>
  );
}
