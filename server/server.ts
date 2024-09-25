import express from "express";
import { settlementApi } from "./settlementApi";
import { MongoClient } from "mongodb";

const client = new MongoClient(
  "mongodb+srv://jhannes:TmOvOj4SBU61OBgm@cluster0.zwzty.mongodb.net/",
);
client.connect().then(async (connection) => {
  const db = connection.db("dugnad");
  const result = await db
    .collection("settlements")
    .find({ department: "books" })
    .toArray();
  console.log(result);
});

const app = express();
app.use(express.json());
app.use(settlementApi);
app.listen(3000);
