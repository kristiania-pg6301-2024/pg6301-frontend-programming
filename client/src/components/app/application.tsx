import React, { FormEvent, useEffect, useState } from "react";
import { ProgressIndicator } from "./progressIndicator";

interface Settlement {
  id: number;
  department: string;
  balance: Record<string, number>;
}

async function fetchSettlements(simulateError: boolean): Promise<Settlement[]> {
  const res = await fetch("/api/settlements?simulateError=" + simulateError, {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error(`Server returned error ${res.status} ${res.statusText}`);
  }
  return await res.json();
}

export function Application() {
  const [settlements, setSettlements] = useState<Settlement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();

  const [department, setDepartment] = useState("");

  useEffect(() => {
    loadSettlements();
  }, []);

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

  async function handleAddSettlement(e: FormEvent) {
    e.preventDefault();

    const newSettlement: Settlement = {
      department,
      balance: {},
      id: settlements.length,
    };
    const res = await fetch("/api/settlements", {
      method: "POST",
      body: JSON.stringify(newSettlement),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      setError(new Error("Could not save"));
    } else {
      setDepartment("");
      await loadSettlements();
    }
  }

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

      <form onSubmit={handleAddSettlement}>
        <h2>Add settlement</h2>
        <div>
          Department:
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
        </div>
        <button>Add department</button>
      </form>
    </>
  );
}
