const express = require("express");
const { PartModel } = require("../Models/parts.model");
const partRouter = express.Router();

partRouter.post("/", async (req, res) => {
  try {
    const part = new PartModel(req.body);
    await part.save();
    res.status(201).send(part);
  } catch (error) {
    res.status(500).send(error);
  }
});

partRouter.get("/:partId", async (req, res) => {
  try {
    const part = await PartModel.findById(req.params.partId);
    res.send(part);
  } catch (error) {
    res.status(500).send(error);
  }
});

partRouter.get("/", async (req, res) => {
  try {
    const parts = await PartModel.find(req.body);
    res.send(parts);
  } catch (error) {
    res.status(500).send(error);
  }
});

partRouter.patch("/:partId", async (req, res) => {
  console.log(req.body);
  try {
    const part = await PartModel.findByIdAndUpdate(req.params.partId, req.body);
    res.send(part);
  } catch (error) {
    res.status(500).send(error);
  }
});

partRouter.delete("/:partId", async (req, res) => {
  try {
    const deletedPart = await PartModel.findByIdAndDelete(req.params.partId);
    if (deletedPart === null) {
      res.status(404).send({ massage: "file not found!" });
      return;
    }
    res.status(204).send();
  } catch (error) {
    res.send(error, 402);
  }
});

module.exports = { partRouter };
