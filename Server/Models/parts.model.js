const mongoose = require("mongoose");

const partSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    modelNumber: { type: Number, required: true, unique: true },
    serviceTag: { type: String, required: true },
    specifications: [
      {
        name: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],

    compatibility: [
      {
        name: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    knownIssues: [
      {
        name: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    installationInstructions: [
      {
        name: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    troubleshootingGuidelines: [
      {
        name: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const PartModel = mongoose.model("partModel", partSchema);

module.exports = { PartModel };
