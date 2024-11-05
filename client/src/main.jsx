import React, { Fragment, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Application />
  </BrowserRouter>,
);

function Application() {
  return <FrontPage />;
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
        <StartLoginButton provider={"google"}>
          Log in with Google
        </StartLoginButton>
      </>
    );
  }

  if (user) {
    return (
      <>
        <h1>You are {user.name}</h1>
        <div>Email: {user.email}</div>
        <img src={user.picture} alt={`Profile picture of ${user.name}`} />
        <div>
          <a href={"/api/login/endSession"}>Log out</a>
        </div>
      </>
    );
  }

  return <h1>Hello Who Are You</h1>;
}
