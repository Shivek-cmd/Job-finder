const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../../models/userModel.js");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// Route for user login
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Check if user with this email exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "Wrong email or password" });
    }

    // Compare provided password with the hashed password stored in the database
    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Wrong email or password" });
    }

    // Create a JWT token using the user's ID and the secret from environment variables
    const token = jwt.sign({ _id: existingUser._id }, process.env.TOKEN_SECRET);

    // Send the token in the response header and a success message in the response body
    res.header("auth-token", token).json({ message: "Logged in successfully" });
  } catch (error) {
    // Pass error to error handling middleware
    next(error);
  }
});

// Route for user registration
router.post("/register", async (req, res, next) => {
  const { name, email, password, mobile } = req.body;

  try {
    // Validate that all required fields are provided
    if (!name || !email || !password || !mobile) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if a user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user instance with the provided and hashed data
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      mobile,
    });

    // Save the new user to the database
    await newUser.save();

    // Respond with a success message
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    // Pass error to error handling middleware
    next(error);
  }
});

module.exports = router;
