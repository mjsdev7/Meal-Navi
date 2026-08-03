const Favourite = require('../models/Favourite');

const addFavourite = async (req, res) => {
  try {
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
    await Favourite.findByIdAndDelete(req.params.id);

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