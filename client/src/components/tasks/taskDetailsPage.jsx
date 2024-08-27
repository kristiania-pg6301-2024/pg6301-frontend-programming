import React from "react";
import {Link, useParams} from "react-router-dom";

export function TaskDetailsPage({tasks}) {
    const {id} = useParams();
    const task = tasks.find(t => t.id == id);

    return <div>
        <h2>Details for task {id}</h2>
        <div>
            <strong>Description </strong>
            <span>{task.description}</span>
        </div>
        <div>
            <strong>Completed? </strong>
            <span>{task.completed ? "true" : "false"}</span>
        </div>
        <div>
            <Link to={"/"}>Show all tasks</Link>
        </div>
    </div>;
}