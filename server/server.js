import express from "express";

const app = express();
app.get("/api/userinfo", (req, res) => {
  res.sendStatus(401); // Unauthorized
});
app.listen(process.env.PORT || 3000);
