import express from "express";
import { Db } from "mongodb";

export function settlementApi(db: Db) {
  const router = express.Router();

  router.get("/api/settlements", async (req, res) => {
    const result = await db.collection("settlements").find({}).toArray();
    res.json(result);
  });

  return router;
}
