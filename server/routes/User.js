const express = require("express");
const router = express.Router();

// Import the required controllers and middleware functions
const { signup, login } = require("../controllers/Auth");

// Route for user signup
router.post("/signup", signup);
// Route for user login
router.post("/login", login);

module.exports = router;