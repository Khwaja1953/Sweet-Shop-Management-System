const User = require("../Models/User");

// Signup controller
const handleUserSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();
    return res.status(201).json({ msg: "User registered successfully", user: newUser });
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

    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    return res.json({ msg: "Login successful", user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error" });
  }
};

module.exports = { handleUserSignup, handleUserLogin };