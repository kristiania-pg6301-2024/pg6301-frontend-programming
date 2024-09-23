import express from "express";
import { settlementsRouter } from "./settlementApi.js";

const app = express();
app.use("/api/settlements", settlementsRouter);
app.listen(3000);
