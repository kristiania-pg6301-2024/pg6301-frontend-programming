import express from "express";

const app = express();
app.use(express.json());

app.get("/api/userinfo", (req, res) => {
  res.sendStatus(401); // unauthorized
});
app.post("/api/login", (req, res) => {
  const { access_token } = req.body;
  res.cookie("access_token", access_token);
  res.sendStatus(201);
});
app.listen(process.env.PORT || 3000);
