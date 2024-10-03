import React, { useEffect, useState } from "react";
import { ProgressIndicator } from "../progressIndicator";

export function LoginRedirect() {
  const [authorizationUri, setAuthorizationUri] = useState<string>();
  useEffect(() => {
    const authorizationEndpoint = "https://www.google.com/search";
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
