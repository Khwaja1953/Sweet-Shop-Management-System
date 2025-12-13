const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const JWT_SECRET = process.env.JWT_SECRET || "sweetmanagementshop"


//token checking
const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ msg: 'Invalid token' });
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ msg: 'Token verification failed' });
  }
};


//check the role of admin only allow admin
const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Admin access required' });
  }
  next();
};

module.exports = { protect, adminOnly };
