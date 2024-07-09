const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectdb = require("./config/connectdb");
const authRoutes = require("./routes/auth");
const fs = require("fs");
dotenv.config();
//store it in a file
//log every incoming request middleware
app.use((req, res, next) => {
  const log = `${req.method} - ${req.url}  - ${req.ip} - ${new Date()}`;
  fs.appendFile("log.txt", log, (err) => {
    if (err) console.log(err);
  });
  next();
});

app.use(express.json());
app.use("/api/auth", authRoutes);
//error handling middleware
app.use((err, req, res, next) => {
  let log;
  log = err.stack;
  log += `/n${req.method} - ${req.url}  - ${req.ip} - ${new Date()}`;

  fs.appendFile("error.txt", log, (err) => {
    if (err) console.log(err);
  });
  res.status(500).send("something broke!");
});
connectdb();
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
