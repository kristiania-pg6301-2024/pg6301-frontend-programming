import express from "express";
import {settlementApi} from "./settlementApi.js";

const app = express();
app.use(express.json());
app.use("/api/settlements", settlementApi);
app.use(express.static("../client/dist"));

app.listen(3000);

