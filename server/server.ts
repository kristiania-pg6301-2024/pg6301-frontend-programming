import express from "express";

const app = express();

function settlementsApi() {
  const router = express.Router();
  router.get("/", (_, res) => {
    res.json({ hello: "world" });
  });
  return router;
}

app.use("/api/settlements", settlementsApi());
app.listen(3000);
