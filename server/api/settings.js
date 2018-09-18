const express = require("express");
const router = express.Router();

const db = require("../db");

const SettingsController = () => {
  router.get("/get", async (req, res) => {
    try {
      let settings = await db.getSettings();
      res.status(200).send(settings);
    } catch (error) {
      console.error(error);
      res.status(400).send(error);
    }
  });

  router.post("/update", async (req, res) => {
    let settings = req.body.settings;
    console.log(settings);
    try {
      let result = db.updateSettings(settings);
      res.status(200).send("OK");
    } catch (error) {
      console.error(error);
    }
  });
  return router;
}

module.exports = SettingsController();
