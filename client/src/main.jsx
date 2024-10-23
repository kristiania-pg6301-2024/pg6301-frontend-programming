import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root"));

function Application() {
  const [user, setUser] = useState();

  async function loadUser() {
    const res = await fetch("/api/userinfo");
    setUser(await res.json());
  }

  useEffect(() => {
    loadUser();
  }, []);

  if (user) {
    return <h1>You are {user.name}</h1>;
  }

  return <h1>Hello Who Are You</h1>;
}

root.render(<Application />);
