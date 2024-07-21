import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useJobs } from "../context/JobProvider.jsx";
import { FaTimes } from "react-icons/fa";

const JobCards = () => {
  const { jobs, deleteJobById } = useJobs();
  const [authUser] = useAuth();
  if (!jobs) return <p>No jobs available</p>;

  return (
    <div className="space-y-6">
      {jobs?.map((job) => (
        <div
          key={job._id}
          className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 transition-transform duration-300 transform hover:scale-105 mx-auto w-[90%] md:w-[70%] mt-14 p-5"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center md:space-x-6">
            <div className="flex-shrink-0 mb-4 md:mb-0">
              <img
                src={job.logo}
                alt={`${job.name} Logo`}
                className="w-20 h-20 object-cover rounded-full shadow-md"
              />
            </div>
            <div className="flex flex-col flex-grow p-2">
              <h1 className="text-xl font-semibold mb-2">{job.position}</h1>
              <p className="text-gray-600 mb-4">{job.name}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {job.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="bg-red-100 text-red-500 border border-red-200 rounded-md px-3 py-1 text-sm"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
            {authUser && (
              <div className="flex flex-col md:flex-row md:space-x-4 mt-4 md:mt-0">
                <Link
                  to={`/update/${job._id}`}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
                >
                  Edit Job
                </Link>
                <button
                  onClick={() => deleteJobById(job._id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out mt-2 md:mt-0"
                >
                  Delete Job
                </button>
                <Link
                  to={`/job-details/${job._id}`}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out mt-2 md:mt-0"
                >
                  View Details
                </Link>
              </div>
            )}
            {!authUser && (
              <div className="flex justify-end mt-4">
                <Link
                  to={`/job-details/${job._id}`}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
                >
                  View Details
                </Link>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobCards;
