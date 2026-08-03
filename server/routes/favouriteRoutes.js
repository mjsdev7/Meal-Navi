const express = require('express');
const router = express.Router();

const { addFavourite, getFavourites, deleteFavourite } = require('../controllers/favouriteController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, addFavourite);
router.get('/', authMiddleware, getFavourites);
router.delete('/:id', authMiddleware, deleteFavourite);

module.exports = router;