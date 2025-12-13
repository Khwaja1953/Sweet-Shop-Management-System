const User = require("../Models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Signup controller
const handleUserSignup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashed , role });
    await newUser.save();
    const payload = { id: newUser._id, role: newUser.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
    return res.status(201).json({ msg: "User registered successfully", token, user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error" });
  }
};

// Login controller
const handleUserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: 'Invalid credentials' });

    const payload = { id: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
    return res.json({ msg: "Login successful", token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error" });
  }
};

module.exports = { handleUserSignup, handleUserLogin };