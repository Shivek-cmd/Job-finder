const express = require("express");
const router = express.Router();
const Job = require("../../models/jobModel.js");

// Route to create a new job listing
router.post("/create", async (req, res, next) => {
  try {
    // Extract job details from request body
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

    // Get user ID from authenticated request
    const userId = req.user._id;

    // Prepare skills array - split, trim, and remove extra spaces
    const skillsArray = String(skills)
      .split(",")
      .map((skill) => skill.trim().replace(/\s+/g, ""));

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
      skills: skillsArray,
      information,
      userId,
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
    const userId = req.user._id;

    // Find the job by ID
    const defaultJob = await Job.findById(id);

    // Check if job exists
    if (!defaultJob) {
      return res.status(404).send("Job not found");
    }

    // Check if the current user is authorized to delete this job
    if (defaultJob.userId.toString() !== userId.toString()) {
      return res.status(403).send("Access Denied, unauthorized user");
    }

    // Delete the job by ID
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
      return res.status(400).send("Invalid request");
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

// Route to update a job listing by ID
router.patch("/update/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if ID parameter is missing or invalid
    if (!id) {
      return res.status(400).send("Invalid request");
    }

    // Extract updated job details from request body
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

    // Get user ID from authenticated request
    const userId = req.user._id;

    // Find the existing job by ID
    const defaultJob = await Job.findById(id);

    // Check if job exists
    if (!defaultJob) {
      return res.status(404).send("Job not found");
    }

    // Check if the current user is authorized to update this job
    if (defaultJob.userId.toString() !== userId.toString()) {
      return res.status(403).send("Access Denied");
    }

    // Prepare skills array - if skills are provided, split, trim, and remove extra spaces; otherwise use existing skills
    const skillsArray = skills
      ? String(skills)
          .split(",")
          .map((skill) => skill.trim().replace(/\s+/g, ""))
      : defaultJob.skills;

    // Update job with provided or default values
    const updatedJob = await Job.findByIdAndUpdate(
      id,
      {
        name: name || defaultJob.name,
        logo: logo || defaultJob.logo,
        position: position || defaultJob.position,
        salary: salary || defaultJob.salary,
        jobType: jobType || defaultJob.jobType,
        remote: remote || defaultJob.remote,
        description: description || defaultJob.description,
        about: about || defaultJob.about,
        skills: skillsArray,
        information: information || defaultJob.information,
      },
      { new: true } // Return the updated document
    );

    // Respond with the updated job details
    res.status(200).json(updatedJob);
  } catch (err) {
    next(err); // Pass error to the error handling middleware
  }
});

// Route to filter job listings by skills
router.get("/filter/:skills", async (req, res, next) => {
  try {
    const skills = req.params.skills;

    // Check if skills parameter is missing
    if (!skills) {
      return res.status(400).send("Skills parameter is required");
    }

    // Prepare skills array - split, trim, and remove extra spaces
    const skillsArray = String(skills)
      .split(",")
      .map((skill) => skill.trim().replace(/\s+/g, ""));

    // Find jobs where skills array includes any of the provided skills
    const jobs = await Job.find({ skills: { $in: skillsArray } }).select(
      "name logo position"
    );

    // Respond with filtered job listings
    res.status(200).json(jobs);
  } catch (err) {
    next(err); // Pass error to the error handling middleware
  }
});

// Route to search for job listings by query (name, position, jobType, description)
router.get("/search/:query", async (req, res, next) => {
  try {
    const query = req.params.query;

    // Find jobs matching any of the search criteria (case-insensitive)
    const jobs = await Job.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { position: { $regex: query, $options: "i" } },
        { jobType: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    }).select("name logo position");

    // Respond with matching job listings
    res.status(200).json(jobs);
  } catch (err) {
    next(err); // Pass error to the error handling middleware
  }
});

module.exports = router;