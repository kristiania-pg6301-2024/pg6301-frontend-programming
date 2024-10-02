import express from "express";
import { Settlement } from "../src/cashBalance";

const settlements: Settlement[] = [
  {
    id: "0",
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
    const id = (settlements.length + 1).toString();
    const settlement = { id, department, balance };
    settlements.push(settlement);
    res.json(settlement);
  });
  return router;
}
