import React from "react";

export interface OauthError {
  error: string;
  error_description?: string;
}

export function OauthErrorView({
  error: { error, error_description },
}: {
  error: OauthError;
}) {
  return (
    <div>
      <h2>Error {error}</h2>
      <p>{error_description}</p>
      <p>
        <a href={"/"}>Try again</a>
      </p>
    </div>
  );
}
