import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";

function JobDetailsPage() {
  const { id } = useParams(); // Get the job ID from the URL
  const [jobs, setJobs] = useState(null);
  const { token } = JSON.parse(localStorage.getItem("userData"));

  const fetchJobDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/jobs/get/${id}`
      );
      setJobs(response.data);
    } catch (err) {
      console.error("error", err);
    }
  };
  useEffect(() => {
    // Fetch job details based on the ID
    fetchJobDetails();
  }, [id]);

  if (!jobs) {
    return <div className="text-center mt-10 text-gray-600">Loading...</div>;
  }

  return (
    <div>
      <Navbar />

      <div className="bg-white w-[90%] mx-auto mt-10 p-8 shadow-xl rounded-lg border border-gray-200 space-y-6">
        <div className="flex justify-between items-center border-b border-gray-300 pb-4">
          <div className="flex space-x-4">
            <p className="text-gray-600 font-medium">
              {jobs.remote ? "Remote" : "On-site"}
            </p>
            <p className="text-gray-600 font-medium">{jobs.jobType}</p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-extrabold">{jobs.position}</h1>
          {token && (
            <Link
              to={`/update/${jobs._id}`}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              Edit Job
            </Link>
          )}
        </div>
        <p className="text-gray-600 text-lg">
          {jobs.location} | {jobs.country}
        </p>
        <div className="flex gap-6 py-4 border-b border-gray-300">
          <div className="flex-1">
            <p className="text-gray-600 font-semibold">Salary</p>
            <p className="text-lg font-medium">₹{jobs.salary}</p>
          </div>
          <div className="flex-1">
            <p className="text-gray-600 font-semibold">Duration</p>
            <p className="text-lg font-medium">{jobs.duration}</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 py-4 border-b border-gray-300">
          <h2 className="text-3xl font-semibold">About the Company</h2>
          <p className="text-gray-700 leading-relaxed">{jobs.about}</p>
        </div>
        <div className="flex flex-col gap-4 py-4 border-b border-gray-300">
          <h2 className="text-3xl font-semibold">Job Description</h2>
          <p className="text-gray-700 leading-relaxed">{jobs.description}</p>
        </div>
        <div className="flex flex-col gap-4 py-4 border-b border-gray-300">
          <h2 className="text-3xl font-semibold">Skills Required</h2>
          <div className="flex flex-wrap gap-3">
            {jobs.skills.map((skill, index) => (
              <p
                key={index}
                className="bg-gray-200 text-gray-800 py-1 px-3 rounded-full border border-gray-300 shadow-sm"
              >
                {skill}
              </p>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 py-4">
          <h2 className="text-3xl font-semibold">Additional Info</h2>
          <p className="text-gray-700 leading-relaxed">{jobs.information}</p>
        </div>
      </div>
    </div>
  );
}

export default JobDetailsPage;
