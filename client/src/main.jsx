import React from "react";
import {createRoot} from "react-dom/client";
import {Application} from "./modules/app/application";
import {BrowserRouter, HashRouter} from "react-router-dom";

const root = createRoot(document.getElementById("root"));
root.render(<BrowserRouter><Application/></BrowserRouter>);


