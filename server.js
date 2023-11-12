require("dotenv").config();
const axios = require("axios");
const express = require("express");
const cors = require("cors");
const bp = require("body-parser");
const route = require("./routes");
const bot = require('./bot')

const app = express();
const PORT = process.env.PORT;

app.use(bp.json());
app.use("/", route);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");



app.listen(PORT, () => {
  bot.launch();
  console.log("Running on port 3k");
  process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
});
