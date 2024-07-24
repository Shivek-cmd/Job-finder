import React from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaRegClock,
} from "react-icons/fa";

const JobCards = ({ jobs }) => {
  if (!Array.isArray(jobs) || jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        <ClipLoader color="#FF0000" size={50} />
        <p className="text-xl font-semibold text-gray-600 mb-2">
          Loading jobs...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {jobs.map((job) => (
        <div
          key={job._id}
          className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 transition-transform duration-300 transform hover:scale-105 mx-auto w-[90%] md:w-[70%] mt-14 p-5"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center md:space-x-6">
            <div className="flex-shrink-0 mb-4 md:mb-0">
              <img
                src={job.logo}
                alt={`${job.name} Logo`}
                className="w-20 h-20 object-contain rounded-full shadow-md"
              />
            </div>
            <div className="flex flex-col flex-grow p-2">
              <h1 className="text-xl font-semibold mb-2">{job.position}</h1>

              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <FaMapMarkerAlt className="text-gray-500 text-lg" />
                  <p className="text-gray-600">{job.location}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <FaMoneyBillWave className="text-gray-500 text-lg" />
                  <p className="text-gray-600">{job.salary}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <FaRegClock className="text-gray-500 text-lg" />
                  <p className="text-gray-600">{job.remote}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <FaCalendarAlt className="text-gray-500 text-lg" />
                  <p className="text-gray-600">{job.jobType}</p>
                </div>
              </div>

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
            <div className="flex flex-col md:flex-row md:space-x-4 mt-4 md:mt-0">
              <Link
                to={`/job-details/${job._id}`}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out mt-2 md:mt-0"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobCards;
