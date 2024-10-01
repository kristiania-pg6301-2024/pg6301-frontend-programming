import express from "express";

const app = express();
const settlementsApi = express.Router();
app.use("/api/settlements", settlementsApi);
app.listen(3000);
