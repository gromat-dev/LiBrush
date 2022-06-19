// server/index.js

import express from "express";

const PORT = 7070;

const app = express();

app.get("/api", (req, res) => {
    res.json({message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
