export type User = { error: "Unauthenticated" } | { username: string };

export function UserProfile(props: { user: User }) {
  return null;
}
