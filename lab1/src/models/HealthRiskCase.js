const mongoose = require("mongoose");

const HealthRiskCaseSchema = new mongoose.Schema({
  pollutant: { type: String, required: true },
  medium: { type: String, enum: ["air", "water"], required: true },

  C: { type: Number, min: 0, required: true },
  IR: { type: Number, min: 0, required: true },
  EF: { type: Number, min: 0, required: true },
  ED: { type: Number, min: 0, required: true },
  BW: { type: Number, min: 0, required: true },
  AT: { type: Number, min: 1, required: true },

  RfD: { type: Number, min: 0, required: true },
  SF: { type: Number, min: 0 },

  CDI: Number,
  HQ: Number,
  HI: Number,
  CR: Number
}, { timestamps: true });

module.exports = mongoose.model("HealthRiskCase", HealthRiskCaseSchema);
