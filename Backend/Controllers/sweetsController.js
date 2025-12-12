const Sweet = require('../Models/Sweet');

// Add new sweet (POST /api/sweets)
const addSweet = async (req, res) => {
  try {
    const { name, category, price, description } = req.body;
    if (!name || !category || price == null) {
      return res.status(400).json({ msg: 'name, category and price are required' });
    }
    const sweet = new Sweet({ name, category, price, description, createdBy: req.user._id });
    await sweet.save();
    res.status(201).json({ msg: 'Sweet created', sweet });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get all sweets (GET /api/sweets)
const getSweets = async (req, res) => {
  try {
    const sweets = await Sweet.find();
    res.json({ sweets });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Search sweets by name, category, price range (GET /api/sweets/search)
const searchSweets = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;
    const filter = {};
    if (name) filter.name = new RegExp(name, 'i');
    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    const sweets = await Sweet.find(filter);
    res.json({ sweets });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update sweet (PUT /api/sweets/:id)
const updateSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const sweet = await Sweet.findByIdAndUpdate(id, update, { new: true });
    if (!sweet) return res.status(404).json({ msg: 'Sweet not found' });
    res.json({ msg: 'Sweet updated', sweet });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Delete sweet (DELETE /api/sweets/:id) Admin only
const deleteSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const sweet = await Sweet.findByIdAndDelete(id);
    if (!sweet) return res.status(404).json({ msg: 'Sweet not found' });
    res.json({ msg: 'Sweet deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = { addSweet, getSweets, searchSweets, updateSweet, deleteSweet };
