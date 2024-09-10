import React from "react";
import {createRoot} from "react-dom/client";
import {Application} from "./modules/app/application";
import {BrowserRouter} from "react-router-dom";

const root = createRoot(document.getElementById("root"));
root.render(<BrowserRouter><Application/></BrowserRouter>);


