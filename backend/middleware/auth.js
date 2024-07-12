const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const User = require("../models/userModel");

// Authentication middleware function
const authMiddleware = async (req, res, next) => {
  // Retrieve the token from the request header
  const token = req.header("auth-token");

  // Check if the token exists
  if (token) {
    try {
      // Verify the token using the secret key from environment variables
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);
      // If the token is verified, find the user associated with the token's _id
      if (verified) {
        const user = await User.findOne({ _id: verified._id });
        // If the user exists, attach the user to the request object and proceed to the next middleware
        if (user) {
          req.user = user;
          console.log(req.user);
          next();
        } else {
          // If no user is found, respond with an "Access Denied" message
          res.status(401).send("Access Denied");
        }
      } else {
        // If the token is not verified, respond with an "Access Denied" message
        res.status(401).send("Access Denied");
      }
    } catch (error) {
      // Handle any errors that occur during token verification
      res.status(401).send("Access Denied");
    }
  } else {
    // If no token is provided, respond with an "Access Denied" message
    res.status(401).send("Access Denied");
  }
};

module.exports = authMiddleware;
