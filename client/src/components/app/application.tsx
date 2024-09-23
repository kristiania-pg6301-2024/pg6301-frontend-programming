import React, { useEffect, useState } from "react";

interface Settlement {
  id: number;
  department: string;
  balance: Record<string, number>;
}

const sampleSettlements: Settlement[] = [
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
];

export function Application() {
  const [settlements, setSettlements] = useState<Settlement[]>([]);

  function loadSettlements() {
    setSettlements(sampleSettlements);
  }

  useEffect(() => {
    loadSettlements();
  }, []);

  return (
    <>
      <h1>Settlements</h1>
      {settlements.map((s) => (
        <div key={s.id}>{s.department}</div>
      ))}
    </>
  );
}
