import React, { useEffect, useState } from "react";

type User = { error: "Unauthenticated" } | { username: string };

function LoginCallback() {
  return null;
}

function ProgressIndicator() {
  return null;
}

function LoginRedirect() {
  return null;
}

function UserProfile(props: { user: User }) {
  return null;
}

export function Application() {
  const [user, setUser] = useState<User>();

  function loadUser() {
    setTimeout(() => setUser({ error: "Unauthenticated" }), 2000);
  }

  useEffect(() => {
    loadUser();
  }, []);

  if (window.location.pathname === "/callback") {
    return <LoginCallback />;
  }

  if (!user) {
    return <ProgressIndicator />;
  }

  if ("error" in user && user.error === "Unauthenticated") {
    return <LoginRedirect />;
  }

  return <UserProfile user={user} />;
}
