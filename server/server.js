import express from "express";
import cookieParser from "cookie-parser";

import dotenv from "dotenv";

dotenv.config({ debug: true });

const app = express();
app.use(express.json());
app.use(cookieParser());

async function fetchJson(url) {
  const res = await fetch(url);
  return await res.json();
}

app.get("/api/login/linkedin/start", async (req, res) => {
  const discoveryEndpoint =
    "https://www.linkedin.com/oauth/.well-known/openid-configuration";
  const { authorization_endpoint } = await fetchJson(discoveryEndpoint);
  const client_id = "7792wb3of776if";
  const redirect_uri = `${req.protocol}://${req.headers.host}/api/login/linkedin/callback`;

  const authorization_url = `${authorization_endpoint}?${new URLSearchParams({
    response_type: "code",
    scope: "profile email openid",
    client_id,
    redirect_uri,
  })}`;
  res.redirect(authorization_url);
});

app.get("/api/login/linkedin/callback", async (req, res) => {
  const { code, error, error_description } = req.query;
  if (error) {
    res.json({
      error,
      error_description,
    });
  } else if (code) {
    const discoveryEndpoint =
      "https://www.linkedin.com/oauth/.well-known/openid-configuration";
    const client_id = "7792wb3of776if";
    const client_secret = process.env.LINKEDIN_CLIENT_SECRET;
    const redirect_uri = `${req.protocol}://${req.headers.host}/api/login/linkedin/callback`;
    const { token_endpoint } = await fetchJson(discoveryEndpoint);
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
      res.cookie("linkedin_access_token", access_token);
      res.redirect("/");
    } else {
      res.status(response.status).json(await response.json());
    }
  } else {
    res.status(500).send("Don't know how to deal with this request");
  }
});

app.get("/api/userinfo", async (req, res) => {
  const { access_token } = req.cookies;

  if (access_token) {
    const discoveryEndpoint =
      "https://accounts.google.com/.well-known/openid-configuration";
    const { userinfo_endpoint } = await fetchJson(discoveryEndpoint);
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
