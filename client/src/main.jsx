import React, {useEffect, useState} from 'react';
import {createRoot} from "react-dom/client";

const root = createRoot(document.getElementById("root"));

function NewTaskForm({onNewTask}) {

    const [title, setTitle] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        const task = {title};
        onNewTask(task);
        setTitle("");
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

    async function loadTasks() {
        const res = await fetch("/api/tasks");
        if (res.ok) {
            setTasks(await res.json());
        } else {
            console.log("Something went wrong");
        }
    }

    useEffect(() => {
        loadTasks();
    }, [])

    async function handleNewTask(task) {
        setTasks((prevTasks) => [task, ...prevTasks]);

        await fetch("/api/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        })
    }

    return <>
        <h1>Here are the tasks we need to do!</h1>

        {tasks.map((task) => (<div key={task.title}>
            <label>
                <input type={"checkbox"}/>
                {task.title}
            </label>
        </div>))}

        <NewTaskForm onNewTask={handleNewTask}/>

    </>;
}

root.render(<TaskApplication/>);