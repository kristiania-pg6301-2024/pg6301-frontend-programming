import React, { useState, useEffect } from "react";

interface Settlement {
  id: number;
  department: string;
  balance: Record<string, number>;
}

const sampleSettlements: Settlement[] = [
  { id: 0, department: "furniture", balance: { "1000kr": 3, "200kr": 80 } },
  { id: 1, department: "cafeteria", balance: { "100kr": 50, "50kr": 60 } },
];

function timeout(millis: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("hei");
    }, millis);
  });
}

function fetchSettlements(): Promise<Settlement[]> {
  return timeout(1000).then(() => sampleSettlements);
}

export function Application() {
  const [settlements, setSettlements] = useState<Settlement[]>([]);

  async function loadSettlements() {
    setSettlements([]);
    fetchSettlements().then((settlements) => {
      setSettlements(settlements);
    });
  }

  useEffect(() => {
    loadSettlements();
  }, []);

  return (
    <>
      <h1>Dugnadsoppgjør</h1>
      {settlements.map((s) => (
        <div key={s.id}>{s.department}</div>
      ))}
      <div>
        <button onClick={() => loadSettlements()}>Refresh</button>
      </div>
    </>
  );
}
