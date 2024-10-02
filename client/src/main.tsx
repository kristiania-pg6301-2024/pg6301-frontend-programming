import { createRoot } from "react-dom/client";
import React from "react";
import { Application } from "./components/app/application";
import { BrowserRouter } from "react-router-dom";

const root = createRoot(document.getElementById("root")!);
root.render(
  <BrowserRouter>
    <Application />
  </BrowserRouter>,
);
