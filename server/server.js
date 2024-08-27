import express from "express";
import {tasksApi} from "./tasksApi.js";

const app = express();
app.use(express.json());
app.listen(3000);
app.use(tasksApi);
