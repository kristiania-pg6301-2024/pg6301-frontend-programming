import React from "react";

interface AuthorizedUser {
  name: string;
  sub: string;
}

export type User = { error: "Unauthenticated" } | AuthorizedUser;

export function UserProfile({ user: { name } }: { user: AuthorizedUser }) {
  return <h1>User profile: {name}</h1>;
}
