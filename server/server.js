import express from "express";

const app = express();
app.use(express.json());

const tasks = [{ title: "create server" }];
app.get("/api/tasks", (req, res) => {
    res.json(tasks);
})
app.post("/api/tasks", (req, res) => {
    const {title} = req.body;
    tasks.push({title});
    res.sendStatus(201);
});

app.use(express.static("../client/dist"));


const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`started http://localhost:${server.address().port}`);
});
