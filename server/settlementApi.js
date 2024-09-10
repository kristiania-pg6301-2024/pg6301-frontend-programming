import express from "express";

export const settlementApi = express.Router();
const settlements = [
    {id: 0, selectedDepartment: "Furniture", balance: {"20kr": 200, "10kr": 52}}
];
settlementApi.get("/", (req, res) => {
    res.json(settlements)
})
settlementApi.post("/", (req, res) => {
    const { selectedDepartment, balance } = req.body;
    const id = settlements.length;
    settlements.push({id, selectedDepartment, balance});
    res.sendStatus(201);
})
