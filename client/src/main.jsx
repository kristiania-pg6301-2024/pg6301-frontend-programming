import React, {useState} from "react";
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root"));

function AddTaskForm() {
    return <form>
        <div>
            <label>
                Task:
            </label>
            <input/>
        </div>
        <div>
            <button>Submit</button>
        </div>
    </form>;
}

function TaskManagerApplication() {
    return <>
        <h1>PG6301 React Task Manager</h1>
        <h2>Existing tasks</h2>
        <h2>Create new tasks</h2>
        <AddTaskForm/>
    </>;
}

root.render(<TaskManagerApplication/>)