import express from "express";
import { Db } from "mongodb";

export function settlementApi(db: Db) {
  const router = express.Router();

  interface Settlement {
    id: number;
    department: string;
    balance: Record<string, number>;
  }

  const sampleSettlements: Settlement[] = [
    { id: 0, department: "furniture", balance: { "1000kr": 3, "200kr": 80 } },
    { id: 1, department: "cafeteria", balance: { "100kr": 50, "50kr": 60 } },
  ];

  function timeout(millis: number, simulateError = false) {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (simulateError) {
          reject(new Error("Something went wrong"));
        } else {
          resolve();
        }
      }, millis);
    });
  }

  router.get("/api/settlements", async (req, res) => {
    const settlements = await db.collection("settlements").find({}).toArray();
    res.json(settlements);
  });

  router.post("/api/settlements", async (req, res) => {
    const newSettlement = {
      id: sampleSettlements.length,
      department: req.body.department,
      balance: req.body.balance,
    };
    await db.collection("settlements").insertOne(newSettlement);
    res.sendStatus(201);
  });

  return router;
}
