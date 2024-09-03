import React, {useState} from "react";

export function Application() {
    const [selectedDepartment, setSelectedDepartment] = useState("Furniture");

    const [kr1000, setKr1000] = useState("")

    const departmentOptions = [
        "Cafe",
        "Furniture",
        "Books",
        "Clothes",
    ];

    const settlementReport = {
        selectedDepartment,
        bills: {
            "1000kr": kr1000
        }
    };
    return <form>
        <h1>Register cash settlement</h1>

        <div>
            Department:
            <select value={selectedDepartment} onChange={e => setSelectedDepartment(e.target.value)}>
                {departmentOptions.map(d => <option>{d}</option>)}
            </select>
        </div>
        <div>
            1000-lapper:{" "}
            <input type="number" value={kr1000} onChange={e => setKr1000(e.target.value)}/>
        </div>
        <div>
            500-lapper:{" "}
            <input type="number"/>
        </div>
        <div>
            200-lapper:{" "}
            <input type="number"/>
        </div>
        <div>
            Sum: 2800 kr
        </div>
        <div>
            <button>Submit</button>
        </div>
        <div>
            <pre>{JSON.stringify(settlementReport)}</pre>
        </div>
    </form>
}