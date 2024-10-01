import express from "express";
import { settlementsApi } from "./settlementsApi";

const app = express();
app.use("/api/settlements", settlementsApi());
app.listen(3000);
