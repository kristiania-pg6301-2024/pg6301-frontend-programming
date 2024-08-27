import React from "react";
import {TaskListItem} from "./taskListItem";

export function TaskList({tasks, onTaskCompleted, onChangeTask}) {
    return <div>
        <h2>Tasks (completed {tasks.filter(t => t.completed).length} of {tasks.length})</h2>
        {tasks.map((task) => <TaskListItem
            key={task.id}
            task={task}
            onCompleted={onTaskCompleted}
            onChange={onChangeTask}
        />)}
    </div>;
}