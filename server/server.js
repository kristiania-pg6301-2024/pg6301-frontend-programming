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
    client_id: "77kd1ulo7t0lpj",
    redirect_uri:
      req.protocol + "://" + req.headers.host + "/api/login/linkedin/callback",
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
    return res.json({
      status: "logging in - but how",
    });
  }

  res.json({
    hello: "world",
  });
});

app.listen(process.env.PORT || 3000);
