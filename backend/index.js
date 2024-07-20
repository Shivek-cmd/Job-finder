const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectdb = require("./config/connectdb");
const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/jobs");
const authMiddleware = require("./middleware/auth.js");
const fs = require("fs");
dotenv.config();
const cors = require("cors");
// Middleware to log every incoming request
app.use((req, res, next) => {
  const log = `${req.method} - ${req.url} - ${req.ip} - ${new Date()}\n`;
  fs.appendFile("log.txt", log, (err) => {
    if (err) console.log(err);
  });
  next();
});

// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(cors());

// Routes for authentication
app.use("/api/auth", authRoutes);
// Routes for creating job, protected by authentication middleware
app.use("/api/jobs", authMiddleware, jobRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  let log;
  log = err.stack;
  log += `\n${req.method} - ${req.url} - ${req.ip} - ${new Date()}\n`;
  fs.appendFile("error.txt", log, (err) => {
    if (err) console.log(err);
  });
  res.status(500).send("Something broke!");
});

// Connect to the database
connectdb();

// Route for the root endpoint
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
