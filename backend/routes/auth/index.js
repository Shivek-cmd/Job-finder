const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../../models/userModel.js");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Check if user with this email exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "Wrong email or password" });
    }

    // Compare passwords
    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Wrong email or password" });
    }

    // Create and return JWT token
    const token = jwt.sign({ _id: existingUser._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).json({ message: "Logged in successfully" });
  } catch (error) {
    next(error); // Pass error to error handling middleware
  }
});

router.post("/register", async (req, res, next) => {
  const { name, email, password, mobile } = req.body;

  try {
    // Validate input fields
    if (!name || !email || !password || !mobile) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user instance
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      mobile,
    });

    // Save the new user to the database
    await newUser.save();

    // Respond with success message
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    next(error); // Pass error to error handling middleware
  }
});

module.exports = router;
