import React from 'react';
import {createRoot} from "react-dom/client";

const root = createRoot(document.getElementById("root"));

function NewTaskForm() {
    return <form>
        <div>
        <label>
            Title: <input type="text"/>
        </label>
        </div>
        <button>Submit</button>
    </form>;
}

function TaskApplication() {
    return <>
        <h1>Here are the tasks we need to do!</h1>

        <NewTaskForm />

        </>;
}

root.render(<TaskApplication />);