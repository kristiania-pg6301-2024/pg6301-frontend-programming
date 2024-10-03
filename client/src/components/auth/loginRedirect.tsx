import React, { useEffect, useState } from "react";
import { ProgressIndicator } from "../progressIndicator";

export function LoginRedirect() {
  const [authorizationUri, setAuthorizationUri] = useState<string>();
  useEffect(() => {
    const authorizationEndpoint =
      "https://login.microsoftonline.com/fb35ccd7-e4c1-47fc-9f1d-4aed73c1df20/oauth2/v2.0/authorize";
    const query = { q: "openid connect" };
    setAuthorizationUri(
      `${authorizationEndpoint}?${new URLSearchParams(query)}`,
    );
  }, []);

  return authorizationUri ? (
    <a href={authorizationUri}>Login</a>
  ) : (
    <ProgressIndicator />
  );
}
