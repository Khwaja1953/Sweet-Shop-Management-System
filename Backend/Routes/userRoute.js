const express = require("express");
const router = express.Router();
const { handleUserSignup, handleUserLogin } = require("../Controllers/userController");

// POST /api/auth/register
router.post("/register", handleUserSignup);

// POST /api/auth/login
router.post("/login", handleUserLogin);

module.exports = router;
