import React, { useEffect, useState } from "react";

interface Settlement {
  id: number;
  department: string;
  balance: Record<string, number>;
}

export function Application() {
  const [settlements, setSettlements] = useState<Settlement[]>([]);

  useEffect(() => {
    setSettlements([
      {
        id: 1,
        department: "furniture",
        balance: { "1000kr": 10, "200kr": 15 },
      },
      {
        id: 2,
        department: "cafeteria",
        balance: { "200kr": 100, "100kr": 15 },
      },
    ]);
  }, []);

  return (
    <>
      <h1>Settlements</h1>
      {settlements.map((s) => (
        <div>A settlement</div>
      ))}
    </>
  );
}
