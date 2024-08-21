import express from "express";

const app = express();
app.use(express.json());

const tasks = [{
    title: "the task from the server"
}];

app.get("/api/tasks", (req, res) => {
    res.send(tasks)
})

app.post("/api/tasks", (req, res) => {
    const {title} = req.body;
    const task = {title}
    tasks.push(task);
    res.send(200);
})


app.listen(3000);



