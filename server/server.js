import express from "express";

const app = express();

app.get("/api/tasks", (req, res) => {
    res.send([{
        title: "the task from the server"
    }])
})


app.listen(3000);



