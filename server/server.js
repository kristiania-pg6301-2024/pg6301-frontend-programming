import express from "express";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.urlencoded());
app.use(cookieParser());

app.get("/api/userinfo", (req, res) => {
  console.log(req.cookies["accessToken"]);
  res.sendStatus(401); // Unauthorized
});

app.post("/api/login", (req, res) => {
  const { accessToken } = req.body;
  res.cookie("accessToken", accessToken, { httpOnly: true });
  res.sendStatus(200);
});
app.listen(process.env.PORT || 3000);
