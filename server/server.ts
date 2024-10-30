import express from "express";
import { settlementRouter } from "./settlementRouter";

const app = express();

app.use(express.json());
app.use("/api/settlements", settlementRouter());

app.listen(3000);
