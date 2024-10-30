import React from "react";
import { createRoot } from "react-dom/client";
import { NewSettlementForm, Settlement } from "./newSettlementForm";

const root = createRoot(document.getElementById("root")!);

async function handleNewSettlement(settlement: Settlement) {
  fetch("/api/settlements", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(settlement),
  });
}

root.render(<NewSettlementForm onNewSettlement={handleNewSettlement} />);
