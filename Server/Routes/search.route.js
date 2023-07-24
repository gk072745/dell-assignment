const express = require("express");
const { PartModel } = require("../Models/parts.model");
const { partRouter } = require("./part.route");
const searchRoute = express.Router();

searchRoute.get("/", async (req, res) => {
  try {
    const searchedTerm = req.query.search;
    let searchObj = {};

    if (+searchedTerm == searchedTerm) {
      searchObj.modelNumber = +searchedTerm;
    } else if (typeof searchedTerm === "string") {
      searchObj.serviceTag = searchedTerm;
    }

    const parts = await PartModel.findOne(searchObj);
    if (parts) res.send(parts);
    else res.status(404).send({ massage: "Parts not found!" });
  } catch (error) {
    res.status(500).send({ massage: "Internal server error!" });
  }
});

module.exports = { searchRoute };
