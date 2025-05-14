const express = require('express');
const app = express();
const userRoutes = require('./src/routes/urlRoutes');
const authRoutes = require('./src/routes/authRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/url', userRoutes);
app.use('/auth', authRoutes);

app.use((req, res) => {
  res.status(404).json({ msg: "Route not found" });
});

module.exports = app;