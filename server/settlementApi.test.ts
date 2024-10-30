import { expect, test } from "vitest";
import express from "express";
import request from "supertest";

const settlementRouter = express.Router();
const allSettlements: object[] = [];

settlementRouter.get("/", (req, res) => {
  res.json(allSettlements);
});

const app = express();
app.use(settlementRouter);

test("that submitted settlements are listed", async () => {
  const newSettlement = {
    department: "test dep",
    balance: { "1000kr": 1000 },
  };

  allSettlements.push({ ...newSettlement });

  request(app)
    .get("/")
    .expect(200)
    .then((response) => {
      expect(response.body).toContainEqual(newSettlement);
    });
});
