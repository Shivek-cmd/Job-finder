import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "./Navbar";
import jobsData from "../../public/jobs.json";
import { useAuth } from "../context/AuthProvider";

function JobDetailsPage() {
  const [authUser, setAuthUser] = useAuth();
  const { id } = useParams(); // Get the job ID from the URL
  const [job, setJob] = useState(null);

  useEffect(() => {
    // Fetch job details based on the ID
    const jobDetails = jobsData.find((job) => job._id === id);
    setJob(jobDetails);
  }, [id]);

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />

      <div className="bg-white w-[80%] mx-auto mt-10 p-8 shadow-lg rounded-lg space-y-6">
        <div className="flex justify-between items-center border-b border-gray-300 pb-4">
          <div className="flex space-x-4">
            <p className="text-gray-600">{job.remote ? "Remote" : "On-site"}</p>
            <p className="text-gray-600">{job.jobType}</p>
          </div>
        </div>
        <div className="flex justify-between items-center gap-2">
          <div>
            <h1 className="text-3xl font-bold">{job.position}</h1>
          </div>
          {authUser && (
            <Link
              to="/"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Edit Job
            </Link>
          )}
        </div>
        <p className="text-gray-600">
          {job.location} | {job.country}
        </p>
        <div className="flex gap-4 py-4 border-b border-gray-300">
          <p className="text-gray-600">Salary</p>
          <p className="text-gray-600">Duration</p>
        </div>
        <div className="flex gap-4 py-4">
          <p className="text-lg font-medium">₹{job.salary}</p>
          <p className="text-lg font-medium">{job.duration}</p>
        </div>
        <div className="flex flex-col gap-4 py-4 border-b border-gray-300">
          <h2 className="text-2xl font-semibold">About the Company</h2>
          <p className="text-gray-700">{job.about}</p>
        </div>
        <div className="flex flex-col gap-4 py-4 border-b border-gray-300">
          <h2 className="text-2xl font-semibold">Job Description</h2>
          <p className="text-gray-700">{job.description}</p>
        </div>
        <div className="flex flex-col gap-4 py-4 border-b border-gray-300">
          <h2 className="text-2xl font-semibold">Skills Required</h2>
          <div className="flex gap-4 flex-wrap">
            {job.skills.map((skill, index) => (
              <p
                key={index}
                className="bg-gray-200 text-gray-800 py-1 px-3 rounded-lg border border-gray-300"
              >
                {skill}
              </p>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 py-4">
          <h2 className="text-2xl font-semibold">Additional Info</h2>
          <p className="text-gray-700">{job.information}</p>
        </div>
      </div>
    </div>
  );
}

export default JobDetailsPage;
