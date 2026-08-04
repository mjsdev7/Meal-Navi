const express = require('express');
const router = express.Router();

const {
  addMealPlan,
  getMealPlans,
  deleteMealPlan
} = require('../controllers/mealPlanController');

const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, addMealPlan);

router.get('/', authMiddleware, getMealPlans);

router.delete('/:id', authMiddleware, deleteMealPlan);

module.exports = router;