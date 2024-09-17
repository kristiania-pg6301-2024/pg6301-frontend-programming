import { useParams } from "react-router-dom";
import React from "react";

import { SettlementReport } from "./money";

export function SettlementDetails({
  settlements,
}: {
  settlements: SettlementReport[];
}) {
  const { id } = useParams();
  const settlement = settlements.find((s) => s.id === parseInt(id || "-1"));

  if (!settlement) return <h1>Not found</h1>;

  const { selectedDepartment, balance } = settlement;

  return (
    <>
      <h1>
        Du ser nå på settlement {id}: {selectedDepartment}
      </h1>
      <pre>{JSON.stringify(balance, null, 2)}</pre>
    </>
  );
}
