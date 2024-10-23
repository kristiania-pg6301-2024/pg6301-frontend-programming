import express from "express";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.urlencoded());
app.use(cookieParser());

app.get("/api/userinfo", async (req, res) => {
  const { accessToken } = req.cookies;
  console.log(accessToken);

  const openidConfigurationRes = await fetch(
    "https://accounts.google.com/.well-known/openid-configuration",
  );
  const openidConfiguration = await openidConfigurationRes.json();
  const { userinfo_endpoint } = openidConfiguration;

  const userinfoRes = await fetch(userinfo_endpoint, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (userinfoRes.ok) {
    const userinfo = await userinfoRes.json();
    console.log(userinfo);
    return res.json(userinfo);
  }

  res.sendStatus(401); // Unauthorized
});

app.post("/api/login", (req, res) => {
  const { accessToken } = req.body;
  res.cookie("accessToken", accessToken, { httpOnly: true });
  res.sendStatus(200);
});
app.listen(process.env.PORT || 3000);
