const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');
const { addSweet, getSweets, searchSweets, updateSweet, deleteSweet } = require('../Controllers/sweetsController');

// Public
router.get('/', getSweets);
router.get('/search', searchSweets);

// Protected
router.post('/', protect, addSweet);
router.put('/:id', protect, updateSweet);
router.delete('/:id', protect, adminOnly, deleteSweet);

module.exports = router;
