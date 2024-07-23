const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/auth.js");
const {
  createJob,
  deleteJobById,
  getJobById,
  getAllJobs,
  updateJobById,
  filterJobsBySkills,
  searchJobsByText,
} = require("../../Controllers/Job.js");

router.post("/create", authMiddleware, createJob);
router.delete("/delete/:id", authMiddleware, deleteJobById);
router.get("/get/:id", getJobById);
router.get("/all", getAllJobs);
router.patch("/update/:id", authMiddleware, updateJobById);
router.get("/filter/:skills", filterJobsBySkills);
router.get("/search/:query", searchJobsByText);

module.exports = router;
