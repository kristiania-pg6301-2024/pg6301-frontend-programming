import express from "express";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/api/userinfo", async (req, res) => {
  const { access_token } = req.cookies;

  if (access_token) {
    const discoveryEndpoint =
      "https://accounts.google.com/.well-known/openid-configuration";
    const configuration = await fetch(discoveryEndpoint);
    const { userinfo_endpoint } = await configuration.json();
    const userinfoRes = await fetch(userinfo_endpoint, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    res.json(await userinfoRes.json());
    return;
  }

  res.sendStatus(401); // unauthorized
});
app.post("/api/login", (req, res) => {
  const { access_token } = req.body;
  res.cookie("access_token", access_token);
  res.sendStatus(201);
});
app.listen(process.env.PORT || 3000);
