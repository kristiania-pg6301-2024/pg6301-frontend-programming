import React, { useEffect, useState } from "react";
import { LoginCallback } from "../auth/loginCallback";
import { LoginRedirect } from "../auth/loginRedirect";
import { ProgressIndicator } from "../progressIndicator";
import { User, UserProfile } from "../auth/userProfile";

import "./application.css";

export function Application() {
  const [user, setUser] = useState<User>();

  function loadUser() {
    setTimeout(() => setUser({ error: "Unauthenticated" }), 500);
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

  if ("error" in user && user.error === "Unauthenticated") {
    return <LoginRedirect />;
  }

  return <UserProfile user={user} />;
}
