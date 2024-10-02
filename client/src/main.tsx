import { createRoot } from "react-dom/client";
import React from "react";
import { NewSettlementForm } from "./components/settlements/newSettlementForm";
import { Settlement } from "../../src/cashBalance";

const root = createRoot(document.getElementById("root")!);

function handleNewSettlement(settlement: Settlement) {
  console.log({ settlement });
}

root.render(<NewSettlementForm onNewSettlement={handleNewSettlement} />);
