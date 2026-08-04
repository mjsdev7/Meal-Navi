const Favourite = require('../models/Favourite');

const addFavourite = async (req, res) => {
  try {
    const existingFavourite = await Favourite.findOne({
      user: req.user.userId,
      meal: req.body.meal
    });

    if (existingFavourite) {
      return res.status(400).json({
        message: "Meal is already in favourites"
      });
    }

    const favourite = await Favourite.create({
      user: req.user.userId,
      meal: req.body.meal
    });

    res.json(favourite);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getFavourites = async (req, res) => {
  try {
    const favourites = await Favourite.find({
      user: req.user.userId
    }).populate('meal');

    res.json(favourites);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const deleteFavourite = async (req, res) => {
  try {
    const favourite = await Favourite.findOne({
      _id: req.params.id,
      user: req.user.userId
    });

    if (!favourite) {
      return res.status(404).json({
        message: "Favourite not found"
      });
    }

    await favourite.deleteOne();

    res.json({
      message: "Favourite deleted"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addFavourite,
  getFavourites,
  deleteFavourite
};