import express from "express";
import {tasksApi} from "./tasksApi.js";

const app = express();
app.use(express.json());
app.use(tasksApi);
app.use(express.static("../client/dist"));

app.listen(3000);
