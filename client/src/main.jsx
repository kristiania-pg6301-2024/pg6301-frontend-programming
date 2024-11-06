import React, { Fragment, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Application />
  </BrowserRouter>,
);

function Application() {
  return (
    <Routes>
      <Route path={"/"} element={<FrontPage />} />
      <Route path={"/login/:provider/callback"} element={<LoginCallback />} />
      <Route path={"*"} element={<h1>Not Found</h1>} />
    </Routes>
  );
}

function LoginCallback() {
  const navigate = useNavigate();
  const responseValues = Object.fromEntries(
    new URLSearchParams(window.location.hash.substring(1)).entries(),
  );
  const { access_token } = responseValues;
  const discovery_endpoint =
    "https://accounts.google.com/.well-known/openid-configuration";

  async function establishSession() {
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ access_token, discovery_endpoint }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      navigate("/");
    }
  }

  useEffect(() => {
    establishSession();
  }, [access_token]);

  return (
    <>
      <div>Vennligst vent mens vi fullfører logginn</div>
      <pre>{access_token}</pre>
    </>
  );
}

function GoogleLoginButton() {
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
      scope: "openid profile email",
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

  return authorizationUrl ? (
    <a href={authorizationUrl}>Log in with Google</a>
  ) : null;
}

function LoginButton({ provider, children }) {
  return (
    <div>
      <a href={`/api/login/${provider}/start`}>{children}</a>
    </div>
  );
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
        <LoginButton provider={"google"}>Log in med Google</LoginButton>
        <LoginButton provider={"linkedin"}>Log in med linkedin</LoginButton>
        <LoginButton provider={"entraid"}>Log in med EntraID</LoginButton>
      </>
    );
  }

  if (user) {
    return (
      <>
        <h1>You are {user.name}</h1>
        <div>Email: {user.email}</div>
        <img src={user.picture} />
        <div>
          <a href={"/api/login/end_session"}>Log out</a>
        </div>
      </>
    );
  }

  return <h1>Hello Who Are You</h1>;
}
