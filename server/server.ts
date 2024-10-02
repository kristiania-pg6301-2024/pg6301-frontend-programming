import express from "express";
import { settlementsApi } from "./settlementsApi";

const app = express();
app.use(express.json());
app.use("/api/settlements", settlementsApi());
app.listen(3000);
