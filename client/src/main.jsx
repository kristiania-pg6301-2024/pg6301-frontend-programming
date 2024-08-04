import React, {useState} from "react";
import {createRoot} from "react-dom/client";

const root = createRoot(document.getElementById("root"));

function AddTaskForm() {
    const [title, setTitle] = useState("")

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Submit TaskForm", {title});
    }

    return <form onSubmit={handleSubmit}>
        <div>
            <label>
                Task:
            </label>
            <input
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
        </div>
        <div>
            <button>Submit {title}</button>
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