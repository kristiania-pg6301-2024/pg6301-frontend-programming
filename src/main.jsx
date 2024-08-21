import React, {useState} from 'react';
import {createRoot} from "react-dom/client";

const root = createRoot(document.getElementById("root"));

function NewTaskForm({onNewTask}) {

    const [title, setTitle] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Submitting task", { title });
        onNewTask({title})
    }

    return <form onSubmit={handleSubmit}>
        <div>
        <label>
            Title: <input
                type="text"
                value={title}
                onChange={(e) => {
                    setTitle(e.target.value);
                }}
        />
        </label>
        </div>
        <button>Submit new task "{title}"</button>
    </form>;
}

function TaskApplication() {
    const [tasks, setTasks] = useState([])

    function handleNewTask(task) {
        setTasks((prevTasks) => [...prevTasks, task]);
    }

    return <>
        <h1>Here are the tasks we need to do!</h1>

        <ul>
            {tasks.map((task) => (<li>{task.title}</li>))}
        </ul>

        <NewTaskForm onNewTask={handleNewTask} />

        </>;
}

root.render(<TaskApplication />);