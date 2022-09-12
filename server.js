require("dotenv").config();
//*dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//*configuration
const port = process.env.PORT ?? 3100;
const MONGO_URI = process.env.MONGO_URI ?? "mongodb://localhost:27017/holidays";
const app = express();

mongoose.connect(MONGO_URI);
mongoose.connection.on("error", (err) =>
  console.log(err.message + " is Mongod not running?")
);
mongoose.connection.on("disconnected", () => log("mongo disconnected"));
mongoose.connection.once("open", () => {
  console.log("connected to mongoose...");
});

app.use(cors());

app.get("/", (req, res) => {
  res.send({ msg: "Holidays" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
