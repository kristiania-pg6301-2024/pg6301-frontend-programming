import { beforeAll, describe, expect, it } from "vitest";
import express from "express";
import request from "supertest";
import { settlementsApi } from "../settlementsApi";
import { MongoClient } from "mongodb";

const app = express();
beforeAll(async () => {
  app.use(express.json());
  const mongoClient = new MongoClient(
    process.env.TEST_MONGO_URI || "mongodb://localhost:27017",
  );
  const db = (await mongoClient.connect()).db("test");
  await db.collection("settlements").deleteMany({});
  app.use(settlementsApi(db));
});

describe("settlements api", () => {
  it("adds a settlement", async () => {
    const settlement = {
      department: "Testing",
      balance: {
        "100kr": Math.floor(Math.random() * 20000),
      },
    };
    const saved = await request(app)
      .post("/")
      .send(settlement)
      .expect(200)
      .then((resp) => resp.body);
    expect(saved).toMatchObject(settlement);
    await request(app)
      .get("/")
      .expect(200)
      .then((response) => expect(response.body).toContainEqual(saved));
  });
});
