import express from "express";
import { settlementApi } from "./settlementApi";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const client = new MongoClient(process.env["MONGODB_URL"]!);
client.connect().then(async (connection) => {
  const db = connection.db("dugnad");
  const result = await db
    .collection("settlements")
    .find({ department: "books" })
    .toArray();
  console.log(result);
  app.use(settlementApi(db));
});

app.use(express.json());
app.listen(3000);
