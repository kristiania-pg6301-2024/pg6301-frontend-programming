import express from "express";
import {settlementApi} from "./settlementApi.js";
import * as path from "node:path";

const app = express();
app.use(express.json());
app.use("/api/settlements", settlementApi);
app.use(express.static("../client/dist"));
app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
        res.sendFile(path.resolve("../client/dist/index.html"))
    } else {
        next();
    }
})

app.listen(3000);