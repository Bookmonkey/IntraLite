const express = require("express");
const router = express.Router();

const db = require("../db");

const LinksController = () => {
  router.get("/get", async (req, res) => {
    let results = await db.getLinks();
    res.status(200).send(results);
  });

  router.post("/add", async (req, res) => {
    let link = req.body.link;
    try {
      let result = await db.addLink(link);
      res.status(200).send(result);
    } catch (error) {
      console.error(error);
    }
  });

  router.post("/update", async (req, res) => {
    let link = req.body.link;
    try {
      await db.updateLink(link);
      res.status(200).send("OK");
    } catch (error) {
      console.error(error);
    }


  });

  router.delete("/delete/:id", async (req, res) => {
    let id = req.params.id;
    try {
      await db.deleteLinkById(id);
      res.status(200).send("OK");
    } catch (error) {
      console.error(error);
    }
  });

  return router;
}

module.exports = LinksController();
