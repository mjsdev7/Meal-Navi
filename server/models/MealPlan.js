const mongoose = require('mongoose');

const mealPlanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  meal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meal',
    required: true
  },

  day: {
    type: String,
    required: true
  },

  mealType: {
    type: String,
    required: true
  }

}, {
  timestamps: true
});

module.exports = mongoose.model('MealPlan', mealPlanSchema);