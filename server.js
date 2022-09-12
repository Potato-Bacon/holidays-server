require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT ?? 3100;

app.get("/", (req, res) => {
  res.send({ msg: "Holidays" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
