import express from "express";

const app = express();
app.use(express.json());
app.get("/api/login", (_, res) => {
  res.status(401).json({ error: "Unauthorized" });
});
app.post("/api/login", (req, res) => {
  const { access_token } = req.body;
  res.cookie("access_token", access_token).redirect(`/`);
});
app.listen(3000);
