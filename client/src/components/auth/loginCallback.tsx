import React from "react";

export function LoginCallback() {
  const params = Object.fromEntries(
    new URLSearchParams(
      window.location.hash?.substring(1) || window.location.search,
    ).entries(),
  );

  if ("error" in params) {
    return (
      <div>
        <h2>Error {params.error}</h2>
        <p>{params.error_description}</p>
        <p>
          <a href={"/"}>Try again</a>
        </p>
      </div>
    );
  }

  return <pre>{JSON.stringify(params, null, 2)}</pre>;
}
