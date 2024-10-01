import React from "react";
import { billTypes, coinTypes } from "../../../../src/cashBalance";

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

      {billTypes.map(({ key }) => (
        <div key={key}>
          <label>
            {key}: <input type={"number"} />
          </label>
        </div>
      ))}
      {coinTypes.map(({ key }) => (
        <div key={key}>
          <label>
            {key}: <input type={"number"} />
          </label>
        </div>
      ))}
    </>
  );
}
