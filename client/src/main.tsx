import { createRoot } from "react-dom/client";
import React from "react";
import { NewSettlementForm } from "./components/settlements/newSettlementForm";

const root = createRoot(document.getElementById("root")!);

root.render(<NewSettlementForm />);
