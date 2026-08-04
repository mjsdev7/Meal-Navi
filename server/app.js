const express = require('express');
const connectDB = require('./config/db');

const app = express();
const port = 3000;

connectDB();

app.use(express.json());

const mealRoutes = require('./routes/mealRoutes');
const userRoutes = require('./routes/userRoutes');
const favouriteRoutes = require('./routes/favouriteRoutes');
const mealPlanRoutes = require('./routes/mealPlanRoutes');

app.use('/api/users', userRoutes);
app.use('/api/meals', mealRoutes);
app.use('/api/favourites', favouriteRoutes);
app.use('/api/mealplans', mealPlanRoutes);

app.get('/', (req, res) => {
  res.send('Meal Navi API is running!');
});

app.listen(port, () => {
  console.log(`Meal Navi server running on port ${port}`);
});