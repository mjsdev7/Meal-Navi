const express = require('express');
const router = express.Router();

const { getMeals, createMeal } = require('../controllers/mealController');

router.get('/', getMeals);
router.post('/', createMeal);

module.exports = router;