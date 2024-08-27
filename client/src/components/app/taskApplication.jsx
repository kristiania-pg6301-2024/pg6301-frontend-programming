import React from "react";
import {TaskList} from "../tasks/taskList";
import {NewTaskForm} from "../tasks/newTaskForm";

export function TaskApplication() {
    const tasks = [
        {id: 1, description: "Follow the lecture", completed: true},
        {id: 2, description: "Read the exercise", completed: false},
        {id: 3, description: "Complete the exercise", completed: false},
    ];

    function handleAddTask(task) {
        console.log("handlAddTask", task);
    }

    return <div>
        <TaskList tasks={tasks}/>
        <NewTaskForm onAddTask={handleAddTask} />
    </div>
}

