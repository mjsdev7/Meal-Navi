const express = require('express');
const router = express.Router();

const {
  createShoppingList,
  getShoppingList,
  updateShoppingList,
  deleteShoppingList
} = require('../controllers/shoppingListController');

const authMiddleware = require('../middleware/authMiddleware');


router.post('/', authMiddleware, createShoppingList);

router.get('/', authMiddleware, getShoppingList);

router.put('/', authMiddleware, updateShoppingList);

router.delete('/', authMiddleware, deleteShoppingList);


module.exports = router;