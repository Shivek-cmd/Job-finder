import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { fetchJobDetailsById, deleteJobById } from "../api/Jobs.js";
import { ClipLoader } from "react-spinners";

function JobDetailsPage() {
  const { id } = useParams();
  const [jobs, setJobs] = useState(null);
  const { token } = JSON.parse(localStorage.getItem("userData") || "{}");
  const navigate = useNavigate();

  const handleUpdatedDate = () => {
    const currentDate = new Date();
    const updatedDate = new Date(jobs.updatedAt);

    const diffInMs = currentDate - updatedDate;
    const msPerWeek = 1000 * 60 * 60 * 24 * 7;
    const msPerDay = 1000 * 60 * 60 * 24;
    const diffInWeeks = diffInMs / msPerWeek;
    const weeks = Math.floor(diffInWeeks);
    const days = Math.floor((diffInMs % msPerWeek) / msPerDay);

    return weeks > 0 ? `${weeks}w ago` : `${days}d ago`;
  };

  const fetchJobDetails = async () => {
    try {
      const data = await fetchJobDetailsById(id);
      setJobs(data);
    } catch (err) {
      console.error("Error fetching job details:", err);
    }
  };

  const handleDeleteJob = async () => {
    try {
      await deleteJobById(id, token);
      console.log("Job deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  if (!jobs) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <ClipLoader color="#FF0000" size={50} />
        <p className="text-xl font-semibold text-gray-600 mt-4">Loading</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="container mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 space-y-4">
          <div className="flex flex-col sm:flex-row sm:justify-between items-center border-b border-gray-300 pb-4 sm:space-x-10">
            <div className="flex space-x-4 sm:space-x-6">
              <p className="text-gray-400 font-medium mb-2 sm:mb-0">
                {handleUpdatedDate()}
              </p>
              <p className="text-gray-400 font-medium mb-2 sm:mb-0">
                {jobs.remote ? "Remote" : "On-site"}
              </p>

              <div className="flex space-x-3 text-gray-600 font-medium mb-2 sm:mb-0">
                <img
                  src={jobs.logo}
                  alt={`${jobs.name} Logo`}
                  className="w-12 h-12 flex relative bottom-2 object-contain rounded-full shadow-md"
                />
                <p className="text-gray-400 font-medium mb-2 sm:mb-0">
                  {jobs.name}
                </p>
              </div>
            </div>
            <div className="text-gray-400 font-medium mb-2 sm:mb-0 ml-auto">
              Posted by {jobs.userId.name.split(" ")[0]}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between items-start">
            <h1 className="text-3xl sm:text-4xl font-semibold mb-4 sm:mb-0">
              {jobs.position}
            </h1>
            <div className="flex flex-wrap gap-4">
              {token && (
                <>
                  <button
                    onClick={handleDeleteJob}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
                  >
                    Delete Job
                  </button>
                  <Link
                    to={`/update/${jobs._id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
                  >
                    Edit Job
                  </Link>
                </>
              )}
            </div>
          </div>

          <p className="text-red-500 text-lg">{jobs.location}</p>

          <div className="flex flex-col sm:flex-row gap-6 py-4 border-b border-gray-300">
            <div className="flex-1">
              <p className="text-gray-400 font-semibold">Salary</p>
              <p className="text-lg font-sans">₹{jobs.salary}/month</p>
            </div>

            <div className="flex-1">
              <p className="text-gray-400 font-semibold">Job Type</p>
              <p className="text-lg font-sans">{jobs.jobType}</p>
            </div>
          </div>

          <div className="py-4 border-b border-gray-300">
            <h2 className="text-2xl font-semibold mb-2">About Company</h2>
            <p className="text-gray-700 leading-relaxed">{jobs.about}</p>
          </div>

          <div className="py-4 border-b border-gray-300">
            <h2 className="text-2xl font-semibold mb-2">
              About the job/internship
            </h2>
            <p className="text-gray-700 leading-relaxed">{jobs.description}</p>
          </div>

          <div className="py-4 border-b border-gray-300">
            <h2 className="text-2xl font-semibold mb-2">Skills Required</h2>
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

          <div className="py-4">
            <h2 className="text-2xl font-semibold mb-2">Additional Info</h2>
            <p className="text-gray-700 leading-relaxed">{jobs.information}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetailsPage;
