const express = require('express');
const connectDB = require('./config/db');

const app = express();
const port = 3000;

connectDB();

app.get('/', (req, res) => {
  res.send('Meal Navi API is running!');
});

app.listen(port, () => {
  console.log(`Meal Navi server running on port ${port}`);
});