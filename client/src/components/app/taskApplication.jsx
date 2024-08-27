import React, {useEffect, useState} from "react";
import {TaskFrontPage} from "../tasks/taskFrontPage";
import {Route, Routes} from "react-router-dom";
import {TaskDetailsPage} from "../tasks/taskDetailsPage";

export function TaskApplication() {
    const [tasks, setTasks] = useState([]);

    const [editingTaskId, setEditingTaskId] = useState()
    const activeTask = tasks.find(t => t.id === editingTaskId);

    async function loadTasks() {
        const res = await fetch("/api/tasks");
        if (res.ok) {
            setTasks(await res.json());
        }
    }

    useEffect(() => {
        loadTasks();
    }, []);

    async function handleAddTask(task) {
        await fetch("/api/tasks", {
            method: "POST",
            body: JSON.stringify(task),
            headers: {
                "Content-Type": "application/json"
            }
        })
        await loadTasks();
    }

    async function putTaskUpdate(id, update) {
        await fetch(`/api/tasks/${id}`, {
            method: "PUT",
            body: JSON.stringify(update),
            headers: {
                "Content-Type": "application/json"
            }
        })
        await loadTasks();
    }

    async function handleTaskCompleted(id) {
        await putTaskUpdate(id, {completed: true});
    }

    function handleChangeTask(id) {
        setEditingTaskId(id);
    }

    function handleCloseDialog() {
        setEditingTaskId(undefined);
    }

    async function handleUpdateTask(id, taskDelta) {
        await putTaskUpdate(id, taskDelta);
    }


    return <Routes>
        <Route
            path={"/"}
            element={<TaskFrontPage
                tasks={tasks}
                onTaskCompleted={handleTaskCompleted}
                onChangeTask={handleChangeTask}
                onAddTask={handleAddTask}
                activeTask={activeTask}
                onUpdateTask={handleUpdateTask}
                onClose={handleCloseDialog}
            />}
        />
        <Route
            path={"/tasks/:id"}
            element={<TaskDetailsPage
                tasks={tasks}
            />}
        />
        <Route path={"*"} element={<h2>Not found</h2>}/>
    </Routes>


}

