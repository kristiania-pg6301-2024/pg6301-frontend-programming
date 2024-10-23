import React, { Fragment, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Application />
  </BrowserRouter>,
);

function Application() {
  return (
    <Routes>
      <Route path={"/"} element={<Fragment />} />
      <Route path={"/login/:provider/callback"} element={<LoginCallback />} />
      <Route path={"*"} element={<h1>Not Found</h1>} />
    </Routes>
  );
}

function LoginCallback() {
  return <div>Vennligst vent mens vi fullfører logginn</div>;
}

function LoginButton() {
  const client_id =
    "34816606807-m5gdfps6ijlopl5psnetie8f3722dmug.apps.googleusercontent.com";
  const discoveryEndpoint =
    "https://accounts.google.com/.well-known/openid-configuration";
  const [authorizationUrl, setAuthorizationUrl] = useState();

  async function createAuthorizationUrl() {
    const configuration = await fetch(discoveryEndpoint);
    const { authorization_endpoint } = await configuration.json();
    const parameters = {
      response_type: "token",
      scope: "profile",
      redirect_uri: window.location.origin + "/login/google/callback",
      client_id,
    };
    setAuthorizationUrl(
      `${authorization_endpoint}?${new URLSearchParams(parameters)}`,
    );
  }

  useEffect(() => {
    createAuthorizationUrl();
  });

  return authorizationUrl ? <a href={authorizationUrl}>Logg inn</a> : null;
}

function FrontPage() {
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
