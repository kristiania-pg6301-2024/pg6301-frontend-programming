import React from "react";

export function BillCountInput({value, setValue, billType}) {
    return <div>
        <div>Antall {billType.description}:</div>
        <input
            type="number"
            value={value.count || ""}
            onChange={e => setValue({count: e.target.value})}
        />
    </div>;
}