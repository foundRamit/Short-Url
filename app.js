const express = require('express');
const app = express();
const userRoutes = require('./routes/urlRoutes');

app.use(express.json());

app.use('/url', userRoutes);

app.use((req, res) => {
  res.status(404).json({ msg: "Route not found" });
});

module.exports = app;