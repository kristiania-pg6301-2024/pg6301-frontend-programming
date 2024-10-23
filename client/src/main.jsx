import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root"));

function LoginButton() {
  const discoveryEndpoint =
    "https://accounts.google.com/.well-known/openid-configuration";
  const [authorizationUrl, setAuthorizationUrl] = useState();

  async function createAuthorizationUrl() {
    const configuration = await fetch(discoveryEndpoint);
    const { authorization_endpoint } = await configuration.json();
    setAuthorizationUrl(authorization_endpoint);
  }

  useEffect(() => {
    createAuthorizationUrl();
  });

  return authorizationUrl ? <a href={authorizationUrl}>Logg inn</a> : null;
}

function Application() {
  const [user, setUser] = useState();
  const [error, setError] = useState();

  async function loadUser() {
    const res = await fetch("/api/userinfo");
    if (res.ok) {
      setUser(await res.json());
    } else {
      setError(`${res.status} ${res.statusText}`);
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  if (error) {
    return (
      <>
        <h1>Something went wrong</h1>
        <div>{error}</div>
        <LoginButton />
      </>
    );
  }

  if (user) {
    return <h1>You are {user.name}</h1>;
  }

  return <h1>Hello Who Are You</h1>;
}

root.render(<Application />);
