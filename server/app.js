const express = require('express');
const app = express();

const port = 3000;

const mealRoutes = require('./routes/mealRoutes');

app.use(express.json());

app.use('/api/meals', mealRoutes);

app.get('/', (req, res) => {
  res.send('Meal Navi API is running!');
});

app.listen(port, () => {
  console.log(`Meal Navi server running on port ${port}`);
});