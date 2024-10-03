import React, { useEffect, useState } from "react";
import { ProgressIndicator } from "../progressIndicator";
import { authorizationEndpoint, client_id } from "./config";

// From https://stackoverflow.com/a/75809704/27658
function randomString() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function encodeBytesAsBase64Url(bytes: ArrayBuffer) {
  return btoa(
    String.fromCharCode.apply(null, Array.from(new Uint8Array(bytes))),
  )
    .split("=")[0]
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

// From https://stackoverflow.com/a/48161723/27658
async function sha256hash(s: string) {
  return encodeBytesAsBase64Url(
    await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s)),
  );
}

export function LoginRedirect() {
  const [authorizationUri, setAuthorizationUri] = useState<string>();

  async function createAuthorizationUri() {
    const code_verifier = randomString();
    sessionStorage.setItem("code_verifier", code_verifier);
    const query = {
      client_id,
      scope: "profile email openid",
      response_type: "code",
      code_challenge_method: "S256",
      code_challenge: await sha256hash(code_verifier),
    };
    return `${authorizationEndpoint}?${new URLSearchParams(query)}`;
  }

  useEffect(() => {
    createAuthorizationUri().then(setAuthorizationUri);
  }, []);

  return authorizationUri ? (
    <>
      <a href={authorizationUri}>Login</a> (<code>{authorizationUri}</code>)
    </>
  ) : (
    <ProgressIndicator />
  );
}
