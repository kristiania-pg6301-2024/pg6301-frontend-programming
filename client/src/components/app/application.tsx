import React, { useEffect, useState } from "react";
import { LoginCallback } from "../auth/loginCallback";
import { LoginRedirect } from "../auth/loginRedirect";
import { ProgressIndicator } from "../progressIndicator";
import { User, UserProfile } from "../auth/userProfile";

import "./application.css";

export function Application() {
  const [user, setUser] = useState<User>();

  async function loadUser() {
    const res = await fetch("/api/login");
    setUser(await res.json());
  }

  useEffect(() => {
    loadUser();
  }, []);

  if (window.location.pathname === "/login/callback") {
    return <LoginCallback />;
  }

  if (!user) {
    return <ProgressIndicator />;
  }

  if ("error" in user) {
    return <LoginRedirect />;
  }
  return <UserProfile user={user} />;
}
