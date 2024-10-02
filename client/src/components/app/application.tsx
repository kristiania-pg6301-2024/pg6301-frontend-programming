import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { NewSettlementForm } from "../settlements/newSettlementForm";
import { Settlement } from "../../../../src/cashBalance";
import { ListSettlements } from "../settlements/listSettlements";

export function Application() {
  const [settlements, setSettlements] = useState<Settlement[]>([]);

  useEffect(() => {
    loadSettlements();
  }, []);

  async function loadSettlements() {
    const res = await fetch("/api/settlements");
    setSettlements(await res.json());
  }

  async function handleNewSettlement(settlement: Settlement) {
    await fetch("/api/settlements", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(settlement),
    });
  }

  return (
    <Routes>
      <Route
        path={"/"}
        element={<ListSettlements settlements={settlements} />}
      />
      <Route
        path={"/new"}
        element={<NewSettlementForm onNewSettlement={handleNewSettlement} />}
      />
      <Route path={"*"} element={<h1>Not Found</h1>} />
    </Routes>
  );
}
