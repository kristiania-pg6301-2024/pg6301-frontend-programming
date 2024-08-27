import React from "react";
import {createRoot} from "react-dom/client";
import {TaskApplication} from "./components/app/taskApplication";

const root = createRoot(document.getElementById("root"));

root.render(<TaskApplication/>)
