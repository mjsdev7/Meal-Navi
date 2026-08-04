const ShoppingList = require('../models/ShoppingList');


const createShoppingList = async (req, res) => {
  try {
    const shoppingList = await ShoppingList.create({
      user: req.user.userId,
      items: req.body.items
    });

    res.json(shoppingList);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


const getShoppingList = async (req, res) => {
  try {
    const shoppingList = await ShoppingList.findOne({
      user: req.user.userId
    });

    res.json(shoppingList);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


const updateShoppingList = async (req, res) => {
  try {
    const shoppingList = await ShoppingList.findOneAndUpdate(
      {
        user: req.user.userId
      },
      {
        items: req.body.items
      },
      {
        new: true,
        runValidators: true
      }
    );

    res.json(shoppingList);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


const deleteShoppingList = async (req, res) => {
  try {
    await ShoppingList.findOneAndDelete({
      user: req.user.userId
    });

    res.json({
      message: "Shopping list deleted"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  createShoppingList,
  getShoppingList,
  updateShoppingList,
  deleteShoppingList
};