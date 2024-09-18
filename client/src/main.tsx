import React from "react";
import { createRoot } from "react-dom/client";
import { AddSettlementForm } from "./components/settlements/addSettlementForm";

const root = createRoot(document.getElementById("root")!);

root.render(<AddSettlementForm />);
