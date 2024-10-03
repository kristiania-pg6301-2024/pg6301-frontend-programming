import express from "express";
import cookieParser from "cookie-parser";

declare global {
  namespace Express {
    interface Request {
      user?: {
        sub: string;
        name: string;
      };
    }
  }
}

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(async (req, _, next) => {
  const { access_token } = req.cookies;
  if (access_token) {
    const res = await fetch("https://graph.microsoft.com/oidc/userinfo", {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    if (res.ok) {
      req.user = await res.json();
      console.log(req.user);
    }
  } else {
    req.user = undefined;
  }
  next();
});

app.get("/api/login", (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: "Unauthenticated" });
  }
});
app.post("/api/login", (req, res) => {
  const { access_token } = req.body;
  res.cookie("access_token", access_token).redirect(`/`);
});
app.listen(3000);
