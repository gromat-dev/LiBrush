// server/index.js

const express = require("express");
const cors = require("cors")

const PORT = 7070;

const app = express();

app.use(cors())
app.use(express.static(__dirname));

app.get("/api", (req, res) => {
    res.json({message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
