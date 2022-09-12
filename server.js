require("dotenv").config();
//* dependencies
const log = require("debug")("holidays:server");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const Country = require("./models/Country");

//* configuration
const PORT = process.env.PORT ?? 3000;
const MONGO_URI = process.env.MONGO_URI ?? "mongodb://localhost:27017/holidays";
const app = express();

mongoose.connect(MONGO_URI);
mongoose.connection.on("error", (err) =>
  log(err.message + " is Mongod not running?")
);
mongoose.connection.on("disconnected", () => log("mongo disconnected"));
mongoose.connection.once("open", () => {
  log("connected to mongoose...");
});

app.use(cors());

app.get("/", (req, res) => {
  res.json({ msg: "Holidays" });
});

app.get("/countries/seed", async (req, res) => {
  const countries = [
    { title: "Singapore" },
    { title: "Italy" },
    { title: "Thailand" },
  ];

  await Country.deleteMany({});

  const result = await Country.insertMany(countries);

  res.json(result);
});

app.get("/countries", async (req, res) => {});

app.listen(PORT, "0.0.0.0", () => {
  log(`Express listing on ${PORT}`);
});
