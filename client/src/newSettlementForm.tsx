import React from "react";

export function NewSettlementForm() {
  const departments = ["Møbler", "Elektronikk", "Bøker"];
  return (
    <>
      <h1>Register new settlement</h1>
      <div>
        <label>
          Avdeling:
          <select>
            {departments.map((department) => (
              <option key={department}>{department}</option>
            ))}
          </select>
        </label>
      </div>
    </>
  );
}
