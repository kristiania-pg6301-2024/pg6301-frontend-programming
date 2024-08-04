import React, {useState} from "react";
import {createRoot} from "react-dom/client";

const root = createRoot(document.getElementById("root"));

function AddTaskForm({onAddTask}) {
    const [title, setTitle] = useState("")

    function handleSubmit(e) {
        e.preventDefault();
        onAddTask({title});
        setTitle("");
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
    const [tasks, setTasks] = useState([])

    async function handleAddTask(task) {
        setTasks(old => [...old, task]);
        await fetch("/api/tasks", {
            "method": "POST",
            "body": JSON.stringify(task),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    return <>
        <h1>PG6301 React Task Manager</h1>
        <h2>Existing tasks</h2>
        {tasks.map((task) => (<div key={task.title}>
            <label>
                <input type="checkbox" />
                {task.title}
            </label>
        </div>))}
        <h2>Create new tasks</h2>
        <AddTaskForm onAddTask={handleAddTask}/>
    </>;
}

root.render(<TaskManagerApplication/>)