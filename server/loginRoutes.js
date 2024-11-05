import express from "express";
import { fetchJson } from "./fetchJson.js";

export function loginRoutes(provider, configuration) {
  const loginApi = express.Router();

  loginApi.get(`/api/login/${provider}/start`, async (req, res) => {
    const { discovery_endpoint, client_id, scope } = configuration;
    const { authorization_endpoint } = await fetchJson(discovery_endpoint);
    const redirect_uri = `${req.origin}/api/login/${provider}/callback`;
    res.redirect(
      `${authorization_endpoint}?${new URLSearchParams({
        response_type: "code",
        scope,
        client_id,
        redirect_uri,
      })}`,
    );
  });

  loginApi.get(`/api/login/${provider}/callback`, async (req, res) => {
    const { code, error, error_description } = req.query;
    if (error) {
      res.json({
        error,
        error_description,
      });
    } else if (code) {
      const { discovery_endpoint, client_id, client_secret } = configuration;
      const redirect_uri = `${req.origin}/api/login/${provider}/callback`;
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

  return loginApi;
}
