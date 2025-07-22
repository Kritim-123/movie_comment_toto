const { connectToMongo } = require("./db");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = 4000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

//Available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/comment", require("./routes/comment"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

connectToMongo();
