import React from "react";
import { createRoot } from "react-dom/client";
import { NewSettlementForm } from "./newSettlementForm";

const root = createRoot(document.getElementById("root")!);
root.render(<NewSettlementForm />);
