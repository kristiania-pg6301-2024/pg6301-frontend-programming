import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/api/userinfo", async (req, res) => {
  const { access_token, discovery_endpoint } = req.cookies;

  if (access_token) {
    const configuration = await fetch(discovery_endpoint);
    const { userinfo_endpoint } = await configuration.json();
    console.log({ discovery_endpoint, userinfo_endpoint });
    const userinfoRes = await fetch(userinfo_endpoint, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    res.status(userinfoRes.status).json(await userinfoRes.json());
    return;
  }

  res.sendStatus(401); // unauthorized
});
app.post("/api/login", (req, res) => {
  const { access_token, discovery_endpoint } = req.body;
  res.cookie("access_token", access_token);
  res.cookie("discovery_endpoint", discovery_endpoint);
  res.sendStatus(201);
});

app.get("/api/login/end_session", async (req, res) => {
  res.clearCookie("access_token");
  res.redirect("/");
});

app.get("/api/login/linkedin/start", async (req, res) => {
  const discovery_endpoint =
    "https://www.linkedin.com/oauth/.well-known/openid-configuration";
  const configuration = await fetch(discovery_endpoint);
  const { authorization_endpoint } = await configuration.json();
  const parameters = {
    response_type: "code",
    scope: "openid profile email",
    client_id: LINKEDIN_CLIENT_ID,
    redirect_uri:
      req.protocol + "://" + req.headers.host + "/api/login/linkedin/callback",
  };
  const authorization_url = `${authorization_endpoint}?${new URLSearchParams(parameters)}`;
  res.redirect(authorization_url);
});

app.get("/api/login/google/start", async (req, res) => {
  const discovery_endpoint =
    "https://accounts.google.com/.well-known/openid-configuration";
  const client_id = GOOGLE_CLIENT_ID;
  const configuration = await fetch(discovery_endpoint);
  const { authorization_endpoint } = await configuration.json();
  const parameters = {
    response_type: "code",
    scope: "openid profile email",
    client_id,
    redirect_uri:
      req.protocol + "://" + req.headers.host + "/api/login/google/callback",
  };
  const authorization_url = `${authorization_endpoint}?${new URLSearchParams(parameters)}`;
  res.redirect(authorization_url);
});

app.get("/api/login/linkedin/callback", async (req, res) => {
  const { error, error_description, code } = req.query;

  if (error) {
    return res.json({
      status: "error",
      error,
      error_description,
    });
  }
  if (code) {
    const discovery_endpoint =
      "https://www.linkedin.com/oauth/.well-known/openid-configuration";
    const configuration = await fetch(discovery_endpoint);
    const { token_endpoint } = await configuration.json();

    const tokenResult = await fetch(token_endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: LINKEDIN_CLIENT_ID,
        client_secret: LINKEDIN_CLIENT_SECRET,
        code,
        redirect_uri:
          req.protocol +
          "://" +
          req.headers.host +
          "/api/login/linkedin/callback",
      }),
    });
    if (tokenResult.ok) {
      const { access_token } = await tokenResult.json();

      res.cookie("access_token", access_token);
      res.cookie("discovery_endpoint", discovery_endpoint);

      return res.redirect("/");
    } else {
      return res.json({
        status: "error",
        json: await tokenResult.json(),
      });
    }
  }

  res.json({
    hello: "world",
  });
});

app.get("/api/login/google/callback", async (req, res) => {
  const { error, error_description, code } = req.query;

  if (error) {
    return res.json({
      status: "error",
      error,
      error_description,
    });
  }
  if (code) {
    const discovery_endpoint =
      "https://accounts.google.com/.well-known/openid-configuration";
    const configuration = await fetch(discovery_endpoint);
    const { token_endpoint } = await configuration.json();

    const tokenResult = await fetch(token_endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        code,
        redirect_uri:
          req.protocol +
          "://" +
          req.headers.host +
          "/api/login/google/callback",
      }),
    });
    if (tokenResult.ok) {
      const { access_token } = await tokenResult.json();

      res.cookie("access_token", access_token);
      res.cookie("discovery_endpoint", discovery_endpoint);

      return res.redirect("/");
    } else {
      return res.json({
        status: "error",
        json: await tokenResult.json(),
      });
    }
  }

  res.json({
    hello: "world",
  });
});

app.listen(process.env.PORT || 3000);
