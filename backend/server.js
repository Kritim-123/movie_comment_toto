const { connectToMongo } = require("./db");
const express = require("express");
const app = express();
const port = 3000;

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
