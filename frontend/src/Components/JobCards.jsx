// JobCards.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
const JobCards = ({ jobs }) => {
  const [authUser, setAuthUser] = useAuth();
  return (
    <>
      {jobs.map((job) => (
        <div
          key={job._id}
          className="shadow-custom-light-red w-[90%] md:w-[70%] mx-auto mt-14 p-5 rounded-lg bg-white"
        >
          <div className="flex flex-col md:flex-row justify-start items-center md:space-x-5">
            <div className="w-full md:w-[50%] flex items-center space-x-5">
              <div className="flex-shrink-0">
                <img
                  src={job.logo}
                  alt={`${job.name} Logo`}
                  className="w-16 h-16 object-cover rounded-full"
                />
              </div>
              <div className="flex flex-col p-2">
                <h1 className="text-2xl font-bold p-2">{job.position}</h1>
                <div className="flex flex-row space-x-4 p-2">
                  <p className="text-gray-600">{job.name}</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-[50%] flex flex-col justify-between mt-5 md:mt-0 space-y-4">
              <div className="flex space-x-4 justify-end">
                {job.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="bg-lightRed border rounded-md p-2"
                  >
                    {skill}
                  </div>
                ))}
              </div>
              {authUser ? (
                <>
                  <div className="flex justify-end space-x-4">
                    <Link className=" border border-red-500 hover:bg-red-200 text-red font-bold py-2 px-4 rounded-md">
                      Edit Job
                    </Link>
                    <Link
                      to={`/job-details/${job._id}`}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
                    >
                      View Details
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-end">
                    <Link
                      to={`/job-details/${job._id}`}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
                    >
                      View Details
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default JobCards;
