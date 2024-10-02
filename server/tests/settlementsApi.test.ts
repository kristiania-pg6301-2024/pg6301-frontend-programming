import { beforeAll, describe, expect, it } from "vitest";
import express from "express";
import request from "supertest";
import { settlementsApi } from "../settlementsApi";

const app = express();
beforeAll(() => {
  app.use(express.json());
  app.use(settlementsApi());
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
