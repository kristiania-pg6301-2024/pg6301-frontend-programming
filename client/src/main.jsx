import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root"));

function LoginButton() {
  const authorizationUrl = "https://accounts.google.com";
  return <a href={authorizationUrl}>Logg inn</a>;
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
