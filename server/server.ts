import express from "express";
import { settlementApi } from "./settlementApi";

const app = express();
app.use(settlementApi);
app.listen(3000);
