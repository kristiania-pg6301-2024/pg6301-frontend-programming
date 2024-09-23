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

function simulatedNetworkCall(millis: number, fail: boolean) {
  return new Promise<void>((resolve, reject) => {
    if (fail) {
      setTimeout(() => reject(new Error("Network failure")), millis);
    } else {
      setTimeout(() => resolve(), millis);
    }
  });
}

export function Application() {
  const [settlements, setSettlements] = useState<Settlement[]>([]);

  function loadSettlements(fail: boolean = false) {
    setSettlements([]);
    simulatedNetworkCall(2000, fail)
      .then(() => setSettlements(sampleSettlements))
      .catch((error) => console.log("an error occurred", error));
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
      <div>
        <button onClick={() => loadSettlements()}>Refresh</button>
      </div>
      <div>
        <button onClick={() => loadSettlements(true)}>
          Refresh with error
        </button>
      </div>
    </>
  );
}
