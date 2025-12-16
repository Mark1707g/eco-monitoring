const express = require("express");
const router = express.Router();

const HealthRiskCase = require("../models/HealthRiskCase");
const calculate = require("../utils/healthRiskCalculator");

// CREATE
router.post("/", async (req, res) => {
  try {
    const results = calculate(req.body);

    const record = new HealthRiskCase({
      ...req.body,
      ...results
    });

    const saved = await record.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ
router.get("/", async (req, res) => {
  const data = await HealthRiskCase.find().sort({ createdAt: -1 });
  res.json(data);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await HealthRiskCase.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
