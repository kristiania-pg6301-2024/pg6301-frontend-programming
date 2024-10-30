import { beforeAll, expect, test } from "vitest";
import express from "express";
import request from "supertest";
import { settlementRouter } from "./settlementRouter";
import { MongoClient } from "mongodb";

const app = express();
app.use(express.json());

beforeAll(async () => {
  const mongoClient = new MongoClient("mongodb://localhost:27017/");
  const connection = await mongoClient.connect();
  app.use(settlementRouter(connection.db("testdb")));
});

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
      expect(
        (response.body as any[]).map(({ _id, ...rest }) => ({
          ...rest,
        })),
      ).toContainEqual(newSettlement);
    });
});
