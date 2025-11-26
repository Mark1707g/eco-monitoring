const express = require('express');
const router = express.Router();
const controller = require('../controllers/metricsController');

// POST /api/metrics
router.post('/', controller.createMetric);

// GET /api/metrics
router.get('/', controller.getMetrics);

// GET /api/metrics/:id
router.get('/:id', controller.getMetricById);

// PUT /api/metrics/:id
router.put('/:id', controller.updateMetric);

// DELETE /api/metrics/:id
router.delete('/:id', controller.deleteMetric);

module.exports = router;
