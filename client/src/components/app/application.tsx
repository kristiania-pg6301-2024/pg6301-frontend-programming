import React, { useState, useEffect } from "react";

interface Settlement {
  department: string;
  balance: Record<string, number>;
}

export function Application() {
  const [settlements, setSettlements] = useState<Settlement[]>([]);

  function loadSettlements() {
    setTimeout(() => {
      setSettlements([
        { department: "furniture", balance: { "1000kr": 3, "200kr": 80 } },
        { department: "cafeteria", balance: { "100kr": 50, "50kr": 60 } },
      ]);
    }, 1000);
  }

  useEffect(() => {
    loadSettlements();
  }, []);

  return (
    <>
      <h1>Dugnadsoppgjør</h1>
      {settlements.map((s) => (
        <div>{s.department}</div>
      ))}
    </>
  );
}
