const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Job name is required"],
    },
    logo: {
      type: String,
      required: [true, "Logo URL is required"],
    },
    position: {
      type: String,
      required: [true, "Job position is required"],
    },
    salary: {
      type: Number,
      required: [true, "Salary is required"],
    },
    jobType: {
      type: String,
      enum: ["Full Time", "Part-Time", "Remote", "Contract", "Internship"],
      required: [true, "Job type is required"],
    },
    remote: {
      type: Boolean,
      required: [true, "Remote status is required"],
    },
    description: {
      type: String,
      required: [true, "Job description is required"],
    },
    about: {
      type: String,
      required: [true, "Company information is required"],
    },
    skills: {
      type: [String],
      required: [true, "Skills are required"],
    },
    information: {
      type: String,
      required: [true, "Additional information is required"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
