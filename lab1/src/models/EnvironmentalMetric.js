const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  lat: { type: Number, required: false },
  lon: { type: Number, required: false },
  description: { type: String }
});

const environmentalMetricSchema = new mongoose.Schema({
  sensorId: { type: String, required: true, index: true },
  type: { type: String, required: true },
  parameter: { type: String, required: true },
  value: { type: Number, required: true },
  unit: { type: String }, 
  location: { type: locationSchema, default: {} },
  recordedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['ok','warning','critical'], default: 'ok' }
}, {
  timestamps: true
});

module.exports = mongoose.model('EnvironmentalMetric', environmentalMetricSchema);
