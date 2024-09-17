import express from "express";
import { SettlementReport } from "../shared/settlement/money";

export const settlementApi = express.Router();
const settlements: SettlementReport[] = [
  {
    id: 0,
    selectedDepartment: "Books",
    balance: { "10kr": 1000, "1000kr": 1 },
  },
];

settlementApi.get("", (_, res) => {
  res.json(settlements);
});
settlementApi.post("", (req, res) => {
  const { selectedDepartment, balance } = req.body;
  const id = settlements.length;
  settlements.push({ id, selectedDepartment, balance });
  res.sendStatus(201);
});
