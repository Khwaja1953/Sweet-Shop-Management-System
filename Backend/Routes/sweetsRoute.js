const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');
const { addSweet, getSweets, searchSweets, updateSweet, deleteSweet, purchaseSweet, restockSweet } = require('../Controllers/sweetsController');

// Public any one can access
router.get('/', getSweets);
router.get('/search', searchSweets);

// Protected only authenticated users will get access
router.post('/', protect, adminOnly, addSweet);
router.put('/:id', protect, adminOnly, updateSweet);
router.post('/:id/purchase', protect, purchaseSweet);
router.post('/:id/restock', protect, adminOnly, restockSweet);
router.delete('/:id', protect, adminOnly, deleteSweet);

module.exports = router;
