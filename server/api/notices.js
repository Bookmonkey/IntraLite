const express = require("express");
const router = express.Router();

const db = require("../db");

const NoticesController = () => {

  // router[get/post/delete]
  router.get("/get", async (req, res) => {
    // let results = await db.Notices.get();
    console.log("Notices: Get");
  });

  return router;
}

module.exports = NoticesController();
