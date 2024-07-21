import React, { useState } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

const FSB = () => {
  const [authUser] = useAuth();

  const [skills, setSkills] = useState([]);

  const handleSkills = () => {
    const array = ["Devops", "Javascript", "C++", "Java", "ML"];
    setSkills(array);
  };

  return (
    <div className="shadow-custom-light-red w-full lg:w-[70%] p-4 mx-auto mt-10 space-y-5">
      <div className="flex flex-col lg:flex-row justify-between items-center w-full lg:w-[90%] mx-auto space-y-4 lg:space-y-0">
        <div className="flex items-center border rounded-md p-4 w-full lg:w-[75%]">
          <FaSearch className="mr-2 text-gray-500" />
          <input
            type="text"
            placeholder="Type any job title"
            className="outline-none w-full"
          />
        </div>
        {authUser && (
          <div className="w-full lg:w-auto flex justify-center lg:justify-end space-x-4">
            <Link
              to="/create"
              className="ml-4 bg-red-500 hover:bg-red-700 text-white p-2 rounded-md flex items-center"
            >
              <FaPlus className="mr-2" />
              Add Job
            </Link>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center mb-4 w-full lg:w-[90%] p-4 mx-auto space-y-6">
        <div className="w-full flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 space-x-0 lg:space-x-4">
          <div className="w-full lg:w-1/4">
            <select
              onClick={handleSkills}
              className="p-2 border rounded-md outline-none w-full"
            >
              <option value="">Skill</option>
              {skills.map((skill, index) => (
                <option key={index} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full lg:w-3/4 flex flex-wrap gap-2"></div>
        </div>
        <div className="w-full flex flex-col lg:flex-row justify-end space-y-4 lg:space-y-0 lg:space-x-4">
          <button className="bg-red-500 hover:bg-red-700 text-white p-2 rounded-md w-full lg:w-auto">
            Apply Filter
          </button>
          <button className="p-2 border border-gray-300 hover:bg-gray-100 rounded-md w-full lg:w-auto">
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default FSB;
