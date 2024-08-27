import {TaskList} from "./taskList";
import {NewTaskForm} from "./newTaskForm";
import {EditTaskDialog} from "./editTaskDialog";
import React from "react";

export function TaskFrontPage({tasks, onChangeTask, onClose, onAddTask, activeTask, onUpdateTask, onTaskCompleted}) {
    return <div>
        <TaskList
            tasks={tasks}
            onTaskCompleted={onTaskCompleted}
            onChangeTask={onChangeTask}
        />
        <NewTaskForm onAddTask={onAddTask}/>
        <EditTaskDialog
            task={activeTask}
            onUpdateTask={onUpdateTask}
            onClose={onClose}
        />
    </div>;
}