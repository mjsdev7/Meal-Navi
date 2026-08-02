const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  name: String,
  category: String,
  ingredients: [String]
});

module.exports = mongoose.model('Meal', mealSchema);