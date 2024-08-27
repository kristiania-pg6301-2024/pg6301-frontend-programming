import express from "express";
import {tasksApi} from "./tasksApi.js";
import * as path from "node:path";

const app = express();
app.use(express.json());
app.use(tasksApi);
app.use(express.static("../client/dist"));

app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
        res.sendFile(path.resolve("../client/dist/index.html"));
    }
})


app.listen(3000);
