import express from "express";
import { Db } from "mongodb";

export function settlementRouter(db: Db) {
  const settlements = db.collection("settlements");
  const router = express.Router();

  router.get("/", async (req, res) => {
    res.json(await settlements.find().toArray());
  });
  router.post("/", (req, res) => {
    const { department, balance } = req.body;
    settlements.insertOne({ department, balance });
    res.sendStatus(201);
  });
  return router;
}
