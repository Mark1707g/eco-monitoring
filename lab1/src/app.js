const express = require('express');
const cors = require('cors');
const metricsRouter = require('./routes/metrics');

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/metrics', metricsRouter);


app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

module.exports = app;
