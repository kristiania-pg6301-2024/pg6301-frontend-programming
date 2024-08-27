import React from "react";
import {TaskListItem} from "./taskListItem";

export function TaskList({tasks}) {
    return <div>
        <h2>Tasks</h2>
        {tasks.map((task) => <TaskListItem key={task.id} task={task}/>)}
    </div>;
}