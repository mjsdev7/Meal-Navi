const express = require('express');
const router = express.Router();

const { getMeals, createMeal, updateMeal, deleteMeal } = require('../controllers/mealController');

router.get('/', getMeals);
router.post('/', createMeal);
router.patch('/:id', updateMeal);
router.delete('/:id', deleteMeal);

module.exports = router;