import express from "express";
import cookieParser from "cookie-parser";

import dotenv from "dotenv";
import { fetchJson } from "./fetchJson.js";
import { loginRoutes } from "./loginRoutes.js";

dotenv.config({ debug: true });

const GOOGLE = {
  client_id: process.env.GOOGLE_CLIENT_ID,
  client_secret: process.env.GOOGLE_CLIENT_SECRET,
  discovery_endpoint:
    "https://accounts.google.com/.well-known/openid-configuration",
  scope: "openid profile email",
};
const LINKEDIN = {
  client_id: process.env.LINKEDIN_CLIENT_ID,
  client_secret: process.env.LINKEDIN_CLIENT_SECRET,
  discovery_endpoint:
    "https://www.linkedin.com/oauth/.well-known/openid-configuration",
  scope: "openid profile email",
};

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  req.origin = `${req.headers["x-forwarded-proto"] || req.protocol}://${req.headers["x-forwarded-host"] || req.headers.host}`;
  next();
});

app.get("/api/login/endSession", (req, res) => {
  res.clearCookie("access_token");
  res.clearCookie("discovery_endpoint");
  res.redirect("/");
});

app.use(loginRoutes("linkedin", LINKEDIN));
app.use(loginRoutes("google", GOOGLE));

app.get("/api/userinfo", async (req, res) => {
  const { access_token, discovery_endpoint } = req.cookies;
  if (access_token) {
    const { userinfo_endpoint } = await fetchJson(discovery_endpoint);
    const userinfoRes = await fetch(userinfo_endpoint, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    res.json(await userinfoRes.json());
  } else {
    res.sendStatus(401); // unauthorized
  }
});

app.listen(process.env.PORT || 3000);
