import React from "react";
import {createRoot} from "react-dom/client";

const root = createRoot(document.getElementById("root"));
root.render(<Application/>);

function Application() {
    return <>
        <h1>Register cash settlement</h1>

        <div>
            Department:
            <select>
                <option value="">Cafe</option>
                <option value="">Furniture</option>
                <option value="">Books</option>
                <option value="">Clothes</option>
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
    </>
}


