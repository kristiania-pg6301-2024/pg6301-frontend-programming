import React, { useEffect, useState } from "react";
import { ProgressIndicator } from "../progressIndicator";

interface Settlement {
  id: number;
  department: string;
  balance: Record<string, number>;
}

function simulatedNetworkCall(millis: number, fail: boolean) {
  return new Promise<void>((resolve, reject) => {
    if (fail) {
      setTimeout(() => reject(new Error("Network failure")), millis);
    } else {
      setTimeout(() => resolve(), millis);
    }
  });
}

async function fetchSettlements(fail: boolean): Promise<Settlement[]> {
  const res = await fetch("/api/settlements?fail=" + fail);
  return (await res.json()) as Settlement[];
}

export function Application() {
  const [settlements, setSettlements] = useState<Settlement[]>([]);
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(true);

  async function loadSettlements(fail: boolean = false) {
    setSettlements([]);
    setLoading(true);
    setError(undefined);
    try {
      setSettlements(await fetchSettlements(fail));
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
      <h1>Settlements</h1>
      {settlements.map((s) => (
        <div key={s.id}>{s.department}</div>
      ))}
      {error && <div>{error.toString()}</div>}
      {loading ? (
        <ProgressIndicator />
      ) : (
        <>
          <div>
            <button onClick={() => loadSettlements()}>Refresh</button>
          </div>
          <div>
            <button onClick={() => loadSettlements(true)}>
              Refresh with error
            </button>
          </div>
        </>
      )}
    </>
  );
}
