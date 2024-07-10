const express = require("express");
const router = express.Router();
const Job = require("../../models/jobModel.js");

// Route to create a new job listing
router.post("/create", async (req, res, next) => {
  try {
    const {
      name,
      logo,
      position,
      salary,
      jobType,
      remote,
      description,
      about,
      skills,
      information,
    } = req.body;

    // Create a new Job instance based on the request body
    const job = new Job({
      name,
      logo,
      position,
      salary,
      jobType,
      remote,
      description,
      about,
      skills,
      information,
    });

    // Save the job to the database
    await job.save();

    // Respond with a success message
    res.status(200).send("Job Created");
  } catch (err) {
    next(err); // Pass error to the error handling middleware
  }
});

// Route to delete a job listing by ID
router.delete("/delete/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    // Check if ID parameter is missing or invalid
    if (!id) {
      return res.status(403).send("Invalid request");
    }

    // Find and delete the job by ID
    await Job.findByIdAndDelete(id);

    // Respond with a success message
    res.status(200).send("Job deleted");
  } catch (err) {
    next(err); // Pass error to the error handling middleware
  }
});

// Route to get a job listing by ID
router.get("/get/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    // Check if ID parameter is missing or invalid
    if (!id) {
      return res.status(403).send("Invalid request");
    }

    // Find the job by ID
    const job = await Job.findById(id);

    // Respond with the job details
    res.status(200).json(job);
  } catch (err) {
    next(err); // Pass error to the error handling middleware
  }
});

// Route to get all job listings with limited fields (name, logo, position)
router.get("/all", async (req, res, next) => {
  try {
    // Fetch all job listings, including only specified fields
    const jobs = await Job.find({}, { name: 1, logo: 1, position: 1 });

    // Respond with the list of jobs
    res.status(200).json(jobs);
  } catch (err) {
    next(err); // Pass error to the error handling middleware
  }
});

module.exports = router;
