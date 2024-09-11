import express from "express";

const app = express();

app.get("/api/settlements", (req, res) => {
    res.json([{
        selectedDepartment: "Books",
        balance: {"10kr": 1000, "1000kr": 1}
    }]);
})

app.listen(3000);

