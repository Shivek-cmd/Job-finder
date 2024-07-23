// controllers/jobController.js

const Job = require("../models/jobModel.js");

const createJob = async (req, res, next) => {
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
      location,
      skills,
      information,
    } = req.body;

    const userId = req.user._id;
    const skillsArray = String(skills)
      .split(",")
      .map((skill) => skill.trim().replace(/\s+/g, ""));

    const job = new Job({
      name,
      logo,
      position,
      salary,
      jobType,
      remote,
      description,
      about,
      location,
      skills: skillsArray,
      information,
      userId,
    });

    await job.save();
    res.status(200).send(job);
  } catch (err) {
    next(err);
  }
};

const deleteJobById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const userId = req.user._id;

    const defaultJob = await Job.findById(id);
    if (!defaultJob) {
      return res.status(404).send("Job not found");
    }

    if (defaultJob.userId.toString() !== userId.toString()) {
      return res.status(403).send("Access Denied, unauthorized user");
    }

    await Job.findByIdAndDelete(id);
    res.status(200).send("Job deleted");
  } catch (err) {
    next(err);
  }
};

const getJobById = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send("Invalid request");
    }

    const job = await Job.findById(id);
    res.status(200).json(job);
  } catch (err) {
    next(err);
  }
};

const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find().select(
      "name logo position salary remote skills jobType location"
    );
    res.status(200).json(jobs);
  } catch (err) {
    next(err);
  }
};

const updateJobById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send("Invalid request");
    }

    const {
      name,
      logo,
      position,
      salary,
      jobType,
      remote,
      description,
      about,
      location,
      skills,
      information,
    } = req.body;

    const userId = req.user._id;
    const defaultJob = await Job.findById(id);

    if (!defaultJob) {
      return res.status(404).send("Job not found");
    }

    if (defaultJob.userId.toString() !== userId.toString()) {
      return res.status(403).send("Access Denied");
    }

    const skillsArray = skills
      ? String(skills)
          .split(",")
          .map((skill) => skill.trim().replace(/\s+/g, ""))
      : defaultJob.skills;

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
      { new: true }
    );

    res.status(200).json(updatedJob);
  } catch (err) {
    next(err);
  }
};

const filterJobsBySkills = async (req, res, next) => {
  try {
    const skills = req.params.skills;
    const skillsArray = skills
      .split(",")
      .map((data) => data.trim())
      .filter((skill) => skill !== "");

    const jobs = await Job.find({ skills: { $all: skillsArray } }).select(
      "name logo position salary remote skills jobType location"
    );

    res.status(200).json(jobs);
  } catch (err) {
    next(err);
  }
};

const searchJobsByText = async (req, res, next) => {
  try {
    const query = req.params.query;

    const jobs = await Job.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { position: { $regex: query, $options: "i" } },
        { jobType: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    }).select("name logo position salary remote skills jobType location");

    res.status(200).json(jobs);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createJob,
  deleteJobById,
  getJobById,
  getAllJobs,
  updateJobById,
  filterJobsBySkills,
  searchJobsByText,
};
