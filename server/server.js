import express from "express";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.urlencoded());
app.use(cookieParser());

async function fetchJson(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }
  return await res.json();
}

app.get("/api/userinfo", async (req, res) => {
  try {
    const { accessToken } = req.cookies;
    const { userinfo_endpoint } = await fetchJson(
      "https://accounts.google.com/.well-known/openid-configuration",
    );
    const userinfo = await fetchJson(userinfo_endpoint, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    res.json(userinfo);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.post("/api/login", (req, res) => {
  const { accessToken } = req.body;
  res.cookie("accessToken", accessToken, { httpOnly: true });
  res.sendStatus(200);
});
app.listen(process.env.PORT || 3000);
