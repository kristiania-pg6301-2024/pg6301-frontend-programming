import React from "react";

export function TaskListItem({task: {completed, description}}) {
    return <div>
        <label>
            <input type="checkbox" checked={completed}/>
            {description}
        </label>
    </div>;
}