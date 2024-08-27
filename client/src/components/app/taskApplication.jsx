import React from "react";
import {TaskList} from "../tasks/taskList";

export function TaskApplication() {
    const tasks = [
        {id: 1, description: "Follow the lecture", completed: true},
        {id: 2, description: "Read the exercise", completed: false},
        {id: 3, description: "Complete the exercise", completed: false},
    ];

    return <TaskList tasks={tasks}/>
}

