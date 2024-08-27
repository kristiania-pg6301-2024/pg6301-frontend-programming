import React, {useState} from "react";
import {TaskList} from "../tasks/taskList";
import {NewTaskForm} from "../tasks/newTaskForm";
import {EditTaskDialog} from "../tasks/editTaskDialog";

export function TaskApplication() {
    const [tasks, setTasks] = useState([
        {id: 1, description: "Follow the lecture", completed: true},
        {id: 2, description: "Read the exercise", completed: false},
        {id: 3, description: "Complete the exercise", completed: false},
    ]);

    const [editingTaskId, setEditingTaskId] = useState()

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


    return <div>
        <TaskList
            tasks={tasks}
            onTaskCompleted={handleTaskCompleted}
            onChangeTask={handleChangeTask}
        />
        <NewTaskForm onAddTask={handleAddTask}/>
        <EditTaskDialog
            task={tasks.find(t => t.id === editingTaskId)}
            onUpdateTask={handleUpdateTask}
            onClose={handleCloseDialog}
        />
    </div>
}

