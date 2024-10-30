import { expect, test } from "vitest";
import express from "express";
import request from "supertest";

const settlementRouter = express.Router();
const allSettlements: object[] = [];

settlementRouter.get("/", (req, res) => {
  res.json(allSettlements);
});
settlementRouter.post("/", (req, res) => {
  const { department, balance } = req.body;
  allSettlements.push({ department, balance });
  res.sendStatus(201);
});

const app = express();
app.use(express.json());
app.use(settlementRouter);

test("that submitted settlements are listed", async () => {
  const newSettlement = {
    department: "test dep " + new Date(),
    balance: { "1000kr": 1000 },
  };

  await request(app).post("/").send(newSettlement).expect(201);

  await request(app)
    .get("/")
    .expect(200)
    .then((response) => {
      expect(response.body).toContainEqual(newSettlement);
    });
});
