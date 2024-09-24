import express from "express";

export const settlementApi = express.Router();

const sampleSettlements = [
  { id: 0, department: "furniture", balance: { "1000kr": 3, "200kr": 80 } },
  { id: 1, department: "cafeteria", balance: { "100kr": 50, "50kr": 60 } },
];

function timeout(millis, simulateError = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (simulateError) {
        reject(new Error("Something went wrong"));
      } else {
        resolve();
      }
    }, millis);
  });
}

settlementApi.get("/api/settlements", async (req, res) => {
  await timeout(1500);
  if (req.query.simulateError === "true") {
    res.sendStatus(400);
  } else {
    res.json(sampleSettlements);
  }
});
