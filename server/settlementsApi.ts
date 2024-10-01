import express from "express";

export function settlementsApi() {
  const router = express.Router();
  router.get("/", (_, res) => {
    res.json({ hello: "world" });
  });
  return router;
}
