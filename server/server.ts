import express from "express";

const app = express();

app.post("/api/settlements", (req, res) => {
  res.sendStatus(201);
});

app.listen(3000);
