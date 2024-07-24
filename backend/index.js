const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectdb = require("./config/connectdb");
const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/jobs");
const fs = require("fs");
const cors = require("cors");

dotenv.config();

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

// CORS configuration to allow only your frontend URL
const corsOptions = {
  origin: ["http://localhost:5173", "https://job-finder-rho-nine.vercel.app"],
  exposedHeaders: ["Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

// Routes for authentication
app.use("/api/auth", authRoutes);
// Routes for creating job, protected by authentication middleware
app.use("/api/jobs", jobRoutes);

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
