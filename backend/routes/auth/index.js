const express = require("express");
const router = express.Router();
const { login, register } = require("../../Controllers/User");

// Route for user login
router.post("/login", login);

// Route for user registration
router.post("/register", register);

module.exports = router;
