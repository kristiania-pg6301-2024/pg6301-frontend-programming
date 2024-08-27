import React, {useState} from "react";
import {TaskFrontPage} from "../tasks/taskFrontPage";
import {Route, Routes} from "react-router-dom";
import {TaskDetailsPage} from "../tasks/taskDetailsPage";

export function TaskApplication() {
    const [tasks, setTasks] = useState([
        {id: 1, description: "Follow the lecture", completed: true},
        {id: 2, description: "Read the exercise", completed: false},
        {id: 3, description: "Complete the exercise", completed: false},
    ]);

    const [editingTaskId, setEditingTaskId] = useState()
    const activeTask = tasks.find(t => t.id === editingTaskId);

    function handleAddTask(task) {
        setTasks((old) => [...old, {...task, id: old.length + 1}])
    }

    function handleTaskCompleted(id) {
        setTasks(old =>
            old.map((task) => task.id === id
                ? {...task, completed: true}
                : task
            )
        );
    }

    function handleChangeTask(id) {
        setEditingTaskId(id);
    }

    function handleCloseDialog() {
        setEditingTaskId(undefined);
    }

    function handleUpdateTask(id, taskDelta) {
        setTasks(old =>
            old.map((task) => task.id === id
                ? {...task, ...taskDelta}
                : task
            )
        );
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

