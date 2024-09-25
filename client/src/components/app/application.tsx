import React, { useEffect, useState } from "react";
import { ProgressIndicator } from "./progressIndicator";

interface Settlement {
  id: number;
  department: string;
  balance: Record<string, number>;
}
async function fetchSettlements(simulateError: boolean): Promise<Settlement[]> {
  const res = await fetch("/api/settlements?simulateError=" + simulateError);
  if (!res.ok) {
    throw new Error(`Server returned error ${res.status} ${res.statusText}`);
  }
  return await res.json();
}

export function Application() {
  const [settlements, setSettlements] = useState<Settlement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();

  async function loadSettlements(simulateError: boolean = false) {
    setLoading(true);
    setSettlements([]);
    setError(undefined);
    try {
      const settlements = await fetchSettlements(simulateError);
      setSettlements(settlements);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSettlements();
  }, []);

  return (
    <>
      <h1>Dugnadsoppgjør</h1>
      {loading && <ProgressIndicator />}
      {error && <div>{error.toString()}</div>}
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
