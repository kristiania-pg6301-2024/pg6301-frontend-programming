import { createRoot } from "react-dom/client";
import React from "react";
import {
  NewSettlementForm,
  Settlement,
} from "./components/settlements/newSettlementForm";

const root = createRoot(document.getElementById("root")!);

function handleNewSettlement(settlement: Settlement) {
  console.log({ settlement });
}

root.render(<NewSettlementForm onNewSettlement={handleNewSettlement} />);
