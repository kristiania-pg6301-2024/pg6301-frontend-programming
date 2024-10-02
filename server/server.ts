import express from "express";
import { settlementsApi } from "./settlementsApi";
import { MongoClient } from "mongodb";
import * as path from "node:path";

const app = express();
app.use(express.json());
app.use(express.static("../client/dist"));
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});
app.listen(process.env.PORT || 3000);

const mongoClient = new MongoClient(
  process.env.MONGO_URI || "mongodb://localhost:27017/settlements",
);
mongoClient.connect().then((connection) => {
  app.use("/api/settlements", settlementsApi(connection.db()));
});
