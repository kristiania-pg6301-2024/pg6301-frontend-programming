import React, {useState} from "react";
import {TaskList} from "../tasks/taskList";
import {NewTaskForm} from "../tasks/newTaskForm";

export function TaskApplication() {
    const [tasks, setTasks] = useState([
        {id: 1, description: "Follow the lecture", completed: true},
        {id: 2, description: "Read the exercise", completed: false},
        {id: 3, description: "Complete the exercise", completed: false},
    ])

    function handleAddTask(task) {
        setTasks((old) => [...old, {...task, id: old.length + 1}])
    }

    function handleTaskCompleted(id) {
        console.log("handleTaskCompleted", {id});
    }

    return <div>
        <TaskList
            tasks={tasks}
            onTaskCompleted={handleTaskCompleted}
        />
        <NewTaskForm onAddTask={handleAddTask}/>
    </div>
}

