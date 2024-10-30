import express from "express";
import { settlementRouter } from "./settlementRouter";
import { MongoClient } from "mongodb";

const app = express();

app.use(express.json());

const mongodb = new MongoClient(
  process.env.MONGODB_URI || "mongodb://localhost:27017",
);
mongodb.connect().then((client) => {
  app.use("/api/settlements", settlementRouter(client.db("settlementdb")));
});

app.listen(3000);
