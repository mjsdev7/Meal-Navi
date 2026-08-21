const MealPlan = require('../models/MealPlan');

const addMealPlan = async (req, res) => {
  try {
    const mealPlan = await MealPlan.create({
      user: req.user.userId,
      meal: req.body.meal,
      day: req.body.day,
      mealType: req.body.mealType
    });

    res.json(mealPlan);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getMealPlans = async (req, res) => {
  try {
    const mealPlans = await MealPlan.find({
      user: req.user.userId
    }).populate('meal');

    res.json(mealPlans);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const deleteMealPlan = async (req, res) => {
  try {
    const mealPlan = await MealPlan.findOne({
      _id: req.params.id,
      user: req.user.userId
    });

    if (!mealPlan) {
      return res.status(404).json({
        message: "Meal plan not found"
      });
    }

    await mealPlan.deleteOne();

    res.json({
      message: "Meal plan deleted"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const clearAllMealPlans = async (req, res) => {
  try {
    await MealPlan.deleteMany({
      user: req.user.userId
    });

    res.json({
      message: "All meal plans cleared"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addMealPlan,
  getMealPlans,
  deleteMealPlan,
  clearAllMealPlans
};