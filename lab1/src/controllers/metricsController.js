const EnvironmentalMetric = require('../models/EnvironmentalMetric');

// Create
exports.createMetric = async (req, res, next) => {
  try {
    const metric = new EnvironmentalMetric(req.body);
    const saved = await metric.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

// Read all
exports.getMetrics = async (req, res, next) => {
  try {
    const { page = 1, limit = 50, type, sensorId } = req.query;
    const filter = {};
    if (type) filter.type = type;
    if (sensorId) filter.sensorId = sensorId;

    const metrics = await EnvironmentalMetric.find(filter)
      .sort({ recordedAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json(metrics);
  } catch (err) {
    next(err);
  }
};

// Read one by id
exports.getMetricById = async (req, res, next) => {
  try {
    const metric = await EnvironmentalMetric.findById(req.params.id);
    if (!metric) return res.status(404).json({ message: 'Not found' });
    res.json(metric);
  } catch (err) {
    next(err);
  }
};

// Update
exports.updateMetric = async (req, res, next) => {
  try {
    const updated = await EnvironmentalMetric.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// Delete
exports.deleteMetric = async (req, res, next) => {
  try {
    const removed = await EnvironmentalMetric.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
};
