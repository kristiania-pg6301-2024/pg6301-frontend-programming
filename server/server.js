import express from "express";
import cookieParser from "cookie-parser";

import dotenv from "dotenv";

dotenv.config({ debug: true });

const GOOGLE = {
  discovery_endpoint:
    "https://accounts.google.com/.well-known/openid-configuration",
};
const LINKEDIN = {
  discovery_endpoint:
    "https://www.linkedin.com/oauth/.well-known/openid-configuration",
  client_id: "7792wb3of776if",
  client_secret: process.env.LINKEDIN_CLIENT_SECRET,
  scope: "openid profile email",
};

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  req.origin = `${req.headers["x-forwarded-proto"] || req.protocol}://${req.headers["x-forwarded-host"] || req.headers.host}`;
  next();
});

async function fetchJson(url) {
  const res = await fetch(url);
  return await res.json();
}

app.get("/api/login/endSession", (req, res) => {
  res.clearCookie("access_token");
  res.clearCookie("linkedin_access_token");
  res.redirect("/");
});

app.get("/api/login/linkedin/start", async (req, res) => {
  const { discovery_endpoint, client_id, scope } = LINKEDIN;
  const { authorization_endpoint } = await fetchJson(discovery_endpoint);
  const redirect_uri = `${req.origin}/api/login/linkedin/callback`;
  res.redirect(
    `${authorization_endpoint}?${new URLSearchParams({
      response_type: "code",
      scope,
      client_id,
      redirect_uri,
    })}`,
  );
});

app.get("/api/login/linkedin/callback", async (req, res) => {
  const { code, error, error_description } = req.query;
  if (error) {
    res.json({
      error,
      error_description,
    });
  } else if (code) {
    const { discovery_endpoint, client_id, client_secret } = LINKEDIN;
    const redirect_uri = `${req.origin}/api/login/linkedin/callback`;
    const { token_endpoint } = await fetchJson(discovery_endpoint);
    const request = {
      code,
      grant_type: "authorization_code",
      client_id,
      client_secret,
      redirect_uri,
    };
    const response = await fetch(token_endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(request).toString(),
    });
    if (response.status === 200) {
      const responseJson = await response.json();
      const { access_token } = responseJson;
      res.cookie("access_token", access_token);
      res.cookie("discovery_endpoint", discovery_endpoint);
      res.redirect("/");
    } else {
      res.status(response.status).json(await response.json());
    }
  } else {
    res.status(500).send("Don't know how to deal with this request");
  }
});

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
app.post("/api/google/login", (req, res) => {
  const { access_token } = req.body;
  res.cookie("access_token", access_token);
  res.cookie("discovery_endpoint", GOOGLE.discovery_endpoint);
  res.sendStatus(201);
});
app.listen(process.env.PORT || 3000);
