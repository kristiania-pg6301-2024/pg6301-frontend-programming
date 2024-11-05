import React, { Fragment, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";

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
  const { provider } = useParams();
  const navigate = useNavigate();
  const responseValues = Object.fromEntries(
    new URLSearchParams(window.location.hash.substring(1)).entries(),
  );
  const { access_token } = responseValues;

  async function establishSession() {
    const res = await fetch(`/api/${provider}/login`, {
      method: "POST",
      body: JSON.stringify({ access_token }),
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
      scope: "profile email",
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
    <div>
      <a href={authorizationUrl}>Logg inn med Google</a>
    </div>
  ) : null;
}

function StartLoginButton({ provider, children }) {
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
        <StartLoginButton provider={"linkedin"}>
          Log in with LinkedIn
        </StartLoginButton>
        <GoogleLoginButton />
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
          <a href={"/api/login/endSession"}>Log out</a>
        </div>
      </>
    );
  }

  return <h1>Hello Who Are You</h1>;
}
