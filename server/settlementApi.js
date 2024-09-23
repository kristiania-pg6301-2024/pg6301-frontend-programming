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

function timeout(millis) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), millis);
  });
}

export const settlementsRouter = express.Router();
settlementsRouter.get("", async (req, res) => {
  await timeout(1000);
  if ("true" === req.query.fail) {
    res.sendStatus(400);
  } else {
    res.json(sampleSettlements);
  }
});
