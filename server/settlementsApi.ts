import express from "express";
import { Db } from "mongodb";

export function settlementsApi(db: Db) {
  const collection = db.collection("settlements");
  const router = express.Router();
  router.get("", async (_, res) => {
    res.json(await collection.find().toArray());
  });
  router.post("", async (req, res) => {
    const { department, balance } = req.body;
    const inserted = await collection.insertOne({ department, balance });
    res.json({ _id: inserted.insertedId.toString(), department, balance });
  });
  return router;
}
