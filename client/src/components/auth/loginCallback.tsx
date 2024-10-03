import React, { useEffect, useState } from "react";
import { ProgressIndicator } from "../progressIndicator";
import { client_id, tokenEndpoint } from "./config";
import { OauthError, OauthErrorView } from "./oauthErrorView";

interface TokenResponse {
  token_type: string;
  scope: string;
  expires_in: number;
  access_token: string;
  id_token: string;
}

function FetchToken({ code }: { code: string }) {
  const [error, setError] = useState<OauthError>();
  async function fetchToken() {
    const code_verifier = sessionStorage.getItem("code_verifier")!;
    const grant_type = "authorization_code";
    const parameters = { code, client_id, grant_type, code_verifier };
    const res = await fetch(tokenEndpoint, {
      method: "POST",
      body: new URLSearchParams(parameters),
    });
    if (!res.ok) {
      setError(await res.json());
    } else {
      const tokenResponse = (await res.json()) as TokenResponse;
      console.log(tokenResponse);
      const { access_token } = tokenResponse;
      await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_token }),
      });
      window.location.pathname = "/";
    }
  }

  useEffect(() => {
    fetchToken();
  }, [code]);
  if (error) {
    return <OauthErrorView error={error} />;
  }
  return <ProgressIndicator title={"fetching token"} />;
}

export function LoginCallback() {
  const params = Object.fromEntries(
    new URLSearchParams(
      window.location.hash?.substring(1) || window.location.search,
    ).entries(),
  ) as OauthError | { code: string };

  if ("error" in params) {
    return <OauthErrorView error={params} />;
  }

  if ("code" in params) {
    return <FetchToken code={params.code} />;
  }

  return <pre>{JSON.stringify(params, null, 2)}</pre>;
}
