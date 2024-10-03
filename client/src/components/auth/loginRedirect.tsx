import React, { useEffect, useState } from "react";
import { ProgressIndicator } from "../progressIndicator";

export function LoginRedirect() {
  const [authorizationUri, setAuthorizationUri] = useState<string>();
  useEffect(() => {
    setAuthorizationUri("https://www.google.com/search?q=openid+connect");
  }, []);

  return authorizationUri ? (
    <a href={authorizationUri}>Login</a>
  ) : (
    <ProgressIndicator />
  );
}
