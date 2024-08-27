import React from "react";
import {createRoot} from "react-dom/client";
import {TaskApplication} from "./components/app/taskApplication";
import {BrowserRouter} from "react-router-dom";

const root = createRoot(document.getElementById("root"));

root.render(
    <BrowserRouter>
        <TaskApplication/>
    </BrowserRouter>
)
