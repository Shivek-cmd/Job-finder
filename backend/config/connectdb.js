const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1); // Exit the process with failure
  }
};
module.exports = connectdb;
//7ERfdI7Lkzs6UlpE
//shivek6856
