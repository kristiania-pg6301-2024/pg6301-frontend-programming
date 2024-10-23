import express from "express";

const app = express();
app.get("/api/userinfo", (req, res) => {
  res.json({
    name: "Johannes",
  });
});
app.listen(process.env.PORT || 3000);
