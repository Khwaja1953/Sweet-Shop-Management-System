const Sweet = require('../Models/Sweet');

// Add new sweet (POST /api/sweets)
const addSweet = async (req, res) => {
  try {
    const { name,image, category, price, description, quantity } = req.body;
    if (!name || !category || price == null) {
      return res.status(400).json({ msg: 'name, category and price are required' });
    }
    if (quantity != null && Number(quantity) < 0) {
      return res.status(400).json({ msg: 'quantity must be >= 0' });
    }
    // Check unique name
    const existing = await Sweet.findOne({ name });
    if (existing) return res.status(400).json({ msg: 'Sweet name already exists' });
    const sweet = new Sweet({ name, image, category, price, description, quantity: Number(quantity) || 0, createdBy: req.user._id });
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

// Search sweets by name or category (regex), price range, and sort (GET /api/sweets/search)
const searchSweets = async (req, res) => {
  try {
    const { q, minPrice, maxPrice, sort } = req.query;
    const filter = {};
    if (q) {
      // match either name or category using case-insensitive regex
      filter.$or = [{ name: new RegExp(q, 'i') }, { category: new RegExp(q, 'i') }];
    }
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    let queryExec = Sweet.find(filter);
    if (sort === 'price_asc') queryExec = queryExec.sort({ price: 1 });
    else if (sort === 'price_desc') queryExec = queryExec.sort({ price: -1 });
    const sweets = await queryExec;
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

// Purchase sweet (POST /api/sweets/:id/purchase)
const purchaseSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const qty = Number(req.body.quantity) || 1;
    if (qty <= 0) return res.status(400).json({ msg: 'quantity must be greater than 0' });
    const sweet = await Sweet.findById(id);
    if (!sweet) return res.status(404).json({ msg: 'Sweet not found' });
    if (sweet.quantity < qty) return res.status(400).json({ msg: 'Insufficient quantity in stock' });
    sweet.quantity = sweet.quantity - qty;
    await sweet.save();
    res.json({ msg: 'Purchase successful', sweet });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Restock sweet (POST /api/sweets/:id/restock) Admin only
const restockSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const qty = Number(req.body.quantity);
    if (!qty || qty <= 0) return res.status(400).json({ msg: 'quantity must be greater than 0' });
    const sweet = await Sweet.findById(id);
    if (!sweet) return res.status(404).json({ msg: 'Sweet not found' });
    sweet.quantity = sweet.quantity + qty;
    await sweet.save();
    res.json({ msg: 'Restock successful', sweet });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = { addSweet, getSweets, searchSweets, updateSweet, deleteSweet, purchaseSweet, restockSweet };
