import express from "express";

export const settlementApi = express.Router();
const settlements = [{
    selectedDepartment: "Books",
    balance: {"10kr": 1000, "1000kr": 1}
}];

settlementApi.get("", (req, res) => {
    res.json(settlements);
});
settlementApi.post("", (req, res) => {
    const {selectedDepartment, balance} = req.body;
    settlements.push({ selectedDepartment, balance });
    res.sendStatus(201);
})
