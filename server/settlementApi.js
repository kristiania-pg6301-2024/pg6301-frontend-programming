import express from "express";

export const sampleSettlements = [
  {
    id: 1,
    department: "furniture",
    balance: { "1000kr": 10, "200kr": 15 },
  },
  {
    id: 2,
    department: "cafeteria",
    balance: { "200kr": 100, "100kr": 15 },
  },
];
export const settlementsRouter = express.Router();
settlementsRouter.get("", (req, res) => {
  res.json(sampleSettlements);
});
