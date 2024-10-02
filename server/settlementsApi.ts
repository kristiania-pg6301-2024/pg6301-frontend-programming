import express from "express";
import { Settlement } from "../src/cashBalance";

const settlements: Settlement[] = [
  {
    department: "Original",
    balance: {},
  },
];

export function settlementsApi() {
  const router = express.Router();
  router.get("", (_, res) => {
    res.json(settlements);
  });
  router.post("", (req, res) => {
    const { department, balance } = req.body;
    settlements.push({ department, balance });
    res.sendStatus(201);
  });
  return router;
}
