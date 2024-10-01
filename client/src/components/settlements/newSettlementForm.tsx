import React from "react";

const departments = ["Furniture", "Books"];

export function NewSettlementForm() {
  return (
    <>
      <h1>New Settlement</h1>

      <div>
        <label>
          Department:{" "}
          <select>
            <option></option>
            {departments.map((department) => (
              <option key={department}>{department}</option>
            ))}
          </select>
        </label>
      </div>
    </>
  );
}
