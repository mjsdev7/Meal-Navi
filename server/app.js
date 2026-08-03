const express = require('express');
const connectDB = require('./config/db');

const app = express();
const port = 3000;

connectDB();

app.use(express.json());

const mealRoutes = require('./routes/mealRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/meals', mealRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Meal Navi API is running!');
});

app.listen(port, () => {
  console.log(`Meal Navi server running on port ${port}`);
});