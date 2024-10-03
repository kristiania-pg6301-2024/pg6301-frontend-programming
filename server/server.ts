import express from "express";

const app = express();
app.get("/api/login", (_, res) => {
  res.status(401).json({ error: "Unauthorized" });
});
app.listen(3000);
