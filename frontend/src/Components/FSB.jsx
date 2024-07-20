// FSB.jsx
import React from "react";
import { FaSearch, FaTimes, FaPlus } from "react-icons/fa";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

const FSB = ({
  skills,
  selectedSkills,
  handleSkills,
  handleSkillChange,
  removeSkill,
  applyFilter,
  clearFilter,
}) => {
  const [authUser] = useAuth();

  return (
    <div className="shadow-custom-light-red w-[70%] p-4 mx-auto mt-10 space-y-5">
      <div className="flex justify-between items-center w-[80%] mx-auto">
        <div className="flex items-center border rounded-md p-4 w-full">
          <FaSearch className="mr-2 text-gray-500" />
          <input
            type="text"
            placeholder="Type any job title"
            className="outline-none w-full"
          />
        </div>
        {authUser && (
          <Link
            to="/create"
            className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md flex items-center"
          >
            <FaPlus className="mr-2" />
            Add Job
          </Link>
        )}
      </div>
      <div className="flex items-center mb-4 w-[80%] p-4 mx-auto space-x-12">
        <div className="w-[30%]">
          <select
            onClick={handleSkills}
            onChange={handleSkillChange}
            className="p-2 border rounded-md outline-none w-full"
          >
            {skills.map((skill, index) => (
              <option key={index} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-center w-[40%] space-x-4">
          <div className="flex space-x-2">
            {selectedSkills.map((skill, index) => (
              <div
                key={index}
                className="bg-gray-200 p-2 rounded-md flex items-center"
              >
                <span>{skill}</span>
                <FaTimes
                  className="ml-2 cursor-pointer text-red-500"
                  onClick={() => removeSkill(skill)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="w-[30%] space-x-3 flex justify-end">
          <button
            onClick={applyFilter}
            className="bg-red-500 hover:bg-red-700 text-white p-2 rounded-md"
          >
            Apply Filter
          </button>
          <button
            onClick={clearFilter}
            className="p-2 border hover:bg-slate-100 rounded-md"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default FSB;
