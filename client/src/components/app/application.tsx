import React from "react";

export function Application() {
  const settlements = [
    { departments: "furniture", balance: { "1000kr": 3, "200kr": 80 } },
    { departments: "cafeteria", balance: { "100kr": 50, "50kr": 60 } },
  ];

  return (
    <>
      <h1>Dugnadsoppgjør</h1>
      {settlements.map((s) => (
        <div>{s.departments}</div>
      ))}
    </>
  );
}
