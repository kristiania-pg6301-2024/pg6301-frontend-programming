import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
  const client_id =
    "34816606807-9rtbidk4oltr6hob3mqlfmuka82e0sb2.apps.googleusercontent.com";

  const [authorizationUrl, setAuthorizationUrl] = useState();
  async function loadConfiguration() {
    const res = await fetch(
      "https://accounts.google.com/.well-known/openid-configuration",
    );
    const openidConfiguration = await res.json();
    const query = {
      response_type: "token",
      client_id,
      scope: "profile",
      redirect_uri: window.location.origin + "/login/google/callback",
    };
    setAuthorizationUrl(
      `${openidConfiguration.authorization_endpoint}?${new URLSearchParams(query)}`,
    );
  }
  useEffect(() => {
    loadConfiguration();
  }, []);
  return authorizationUrl ? <a href={authorizationUrl}>Logg inn</a> : null;
}

function FrontPage() {
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

function LoginCallback() {
  return <div>Please wait...</div>;
}

function Application() {
  return (
    <Routes>
      <Route path="/" element={<FrontPage />} />
      <Route path="/login/:idProvider/callback" element={<LoginCallback />} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
}

root.render(
  <BrowserRouter>
    <Application />
  </BrowserRouter>,
);
