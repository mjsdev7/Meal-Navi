const Meal = require('../models/Meal');

const getMeals = async (req, res) => {
  try {
    const meals = await Meal.find();
    res.json(meals);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const createMeal = async (req, res) => {
  try {
    const newMeal = await Meal.create(req.body);
    res.json(newMeal);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMeals, 
  createMeal
};