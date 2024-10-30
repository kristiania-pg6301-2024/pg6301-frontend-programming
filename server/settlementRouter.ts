import express from "express";

export function settlementRouter() {
  const router = express.Router();
  const allSettlements: object[] = [];

  router.get("/", (req, res) => {
    res.json(allSettlements);
  });
  router.post("/", (req, res) => {
    const { department, balance } = req.body;
    allSettlements.push({ department, balance });
    res.sendStatus(201);
  });
  return router;
}
