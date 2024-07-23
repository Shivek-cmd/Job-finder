const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const dotenv = require("dotenv");
dotenv.config();

// Handle user login
const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "Wrong email or password" });
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Wrong email or password" });
    }

    const token = jwt.sign({ _id: existingUser._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).json({
      message: "Logged in successfully",
      token: token,
      user: { name: existingUser.name },
    });
  } catch (error) {
    next(error);
  }
};

// Handle user registration
const register = async (req, res, next) => {
  const { name, email, password, mobile } = req.body;

  try {
    if (!name || !email || !password || !mobile) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      mobile,
    });

    await newUser.save();
    const token = jwt.sign({ _id: newUser._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).json({
      message: "User registered successfully",
      token: token,
      user: { name: newUser.name },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { login, register };
