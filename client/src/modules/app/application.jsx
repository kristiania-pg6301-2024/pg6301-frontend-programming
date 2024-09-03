import React from "react";

export function Application() {
    const departments = [
        "Cafe",
        "Furniture",
        "Books",
        "Clothes",
    ];

    return <form>
        <h1>Register cash settlement</h1>

        <div>
            Department:
            <select>
                {departments.map(d => <option>{d}</option>)}
            </select>
        </div>
        <div>
            1000-lapper:{" "}
            <input type="number"/>
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
    </form>
}