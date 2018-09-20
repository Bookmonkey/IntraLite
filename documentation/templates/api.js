const express = require("express");
const router = express.Router();

const db = require("../db");

const CONTROLLERNAME = () => {

  // router[get/post/delete]
  router.get("/get", async (req, res) => {
    
  });

  return router;
}

module.exports = CONTROLLERNAME();
