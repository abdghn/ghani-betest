const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.route');

const app = express();

app.use(express.json());
app.use('/api', userRoutes);

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});

module.exports = app;
