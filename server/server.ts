import express from "express";
import { settlementsApi } from "./settlementsApi";
import { MongoClient } from "mongodb";

const app = express();
app.use(express.json());
app.listen(3000);

const mongoClient = new MongoClient(
  process.env.MONGO_URI || "mongodb://localhost:27017/settlements",
);
mongoClient.connect().then((connection) => {
  app.use("/api/settlements", settlementsApi(connection.db()));
});
