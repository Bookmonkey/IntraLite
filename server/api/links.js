const express = require("express");
const router = express.Router();

const db = require("../db");

const LinksController = () => {
  router.get("/get", async (req, res) => {
    let results = await db.getLinks();
    res.status(200).send(results);
  });

  router.post("/add", (req, res) => {
    let link = req.body.link;
    db.addLink(link);
  });

  router.put("/update/:id", (req, res) => {});

  router.delete("/delete/:id", (req, res) => {});

  return router;
}

module.exports = LinksController();
