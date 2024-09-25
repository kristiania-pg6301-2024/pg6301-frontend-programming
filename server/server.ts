import express from "express";
import { settlementApi } from "./settlementApi";
import { MongoClient } from "mongodb";

const MONGODB_URL =
  "mongodb+srv://jhannes:e1HmG7xD5AxwaxHt@cluster0.jitqp.mongodb.net/";

const client = new MongoClient(MONGODB_URL);
client.connect().then(async (connection) => {
  const database = connection.db("dugnad_application");
  const movies = await database
    .collection("settlements")
    .find({})
    .limit(20)
    .toArray();
  console.log(movies);
  app.use(settlementApi(connection.db("dugnad_application")));
});

const app = express();
app.listen(3000);
