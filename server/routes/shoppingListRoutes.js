const express = require("express");
const router = express.Router();

const {
  createShoppingList,
  getShoppingList,
  updateShoppingList,
  deleteShoppingList,
  generateShoppingList,
} = require("../controllers/shoppingListController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createShoppingList);

router.get("/", authMiddleware, getShoppingList);

router.put("/", authMiddleware, updateShoppingList);

router.delete("/", authMiddleware, deleteShoppingList);

router.post("/generate", authMiddleware, generateShoppingList);

module.exports = router;