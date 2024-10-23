import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root"));

function useUserInfo() {
  const [userinfo, setUserinfo] = useState();
  const [error, setError] = useState();

  async function loadUserInfo() {
    try {
      const res = await fetch("/api/userinfo");
      if (res.ok) {
        setUserinfo(await res.json());
      } else {
        setError(`${res.status} ${res.statusText}`);
      }
    } catch (e) {
      setError(e);
    }
  }

  useEffect(() => {
    loadUserInfo();
  }, []);

  return { userinfo, error };
}

function LoginButton() {
  const [authorizationUrl, setAuthorizationUrl] = useState();
  async function loadConfiguration() {
    const res = await fetch(
      "https://accounts.google.com/.well-known/openid-configuration",
    );
    const openidConfiguration = await res.json();
    setAuthorizationUrl(openidConfiguration.authorization_endpoint);
  }
  useEffect(() => {
    loadConfiguration();
  }, []);
  return authorizationUrl ? <a href={authorizationUrl}>Logg inn</a> : null;
}

function Application() {
  const { userinfo, error } = useUserInfo();

  if (error) {
    return (
      <>
        <h1>En feil har inntruffet</h1>
        <div>{error.toString()}</div>
        <LoginButton />
      </>
    );
  }
  if (!userinfo) return <div>Loading...</div>;

  return <h1>Hello {userinfo.username}</h1>;
}

root.render(<Application />);
