import React, { useState, useEffect } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const FSB = ({ searchByText, fetchAllJobs }) => {
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [input, setInput] = useState("");
  const { token } = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    // Initialize skills only once
    const array = [
      "JavaScript",
      "Node.js",
      "React",
      "CSS",
      "SQL",
      "Azure",
      "Docker",
    ];
    setSkills(array);
  }, []);

  const handleSkillChange = (e) => {
    const selectedSkill = e.target.value;
    if (selectedSkill && !selectedSkills.includes(selectedSkill)) {
      setSelectedSkills([...selectedSkills, selectedSkill]);
    }
  };

  const removeSkill = (skill) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
  };

  const applyFilter = () => {
    filterBySkills(selectedSkills);
  };

  const clearFilters = () => {
    setSelectedSkills([]);
    setInput("");
  };

  useEffect(() => {
    if (input) {
      searchByText(input);
    } else {
      fetchAllJobs();
    }
  }, [input, searchByText]);

  return (
    <div className="shadow-md border rounded-lg w-full lg:w-3/4 p-4 mx-auto mt-10 space-y-8 bg-white">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:w-full space-y-4 lg:space-y-0 lg:space-x-4 w-full">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search jobs by title, skill, or company"
            className="w-full lg:w-3/4 py-2 px-4 border rounded-md text-black placeholder-gray-500 border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          {token && (
            <Link
              to="/jobform"
              className="flex items-center justify-center py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-md transition duration-300 ease-in-out lg:ml-4 w-full lg:w-auto"
            >
              <FaPlus className="mr-2" />
              Add Job
            </Link>
          )}
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-start lg:items-center lg:space-x-14 space-y-4 lg:space-y-0">
        <select
          onChange={handleSkillChange}
          className="w-full lg:w-[30%] p-2 border rounded-md outline-none text-gray-700 bg-gray-50 hover:bg-gray-100 focus:ring-2 focus:ring-red-500"
        >
          <option value="">Select a skill</option>
          {skills.map((skill, index) => (
            <option key={index} value={skill}>
              {skill}
            </option>
          ))}
        </select>
        <div className="w-full lg:w-[50%] flex flex-wrap justify-start lg:justify-center items-center space-x-2">
          {selectedSkills.map((skill, index) => (
            <div
              key={index}
              className="bg-gray-200 p-2 rounded-md flex items-center space-x-2 mb-2"
            >
              <span className="text-gray-800 text-sm">{skill}</span>
              <FaTimes
                className="cursor-pointer text-red-500 hover:text-red-600 transition"
                onClick={() => removeSkill(skill)}
              />
            </div>
          ))}
        </div>
        <div className="w-full lg:w-[30%] flex flex-col lg:flex-row items-center lg:space-x-4 space-y-2 lg:space-y-0">
          <button
            disabled={selectedSkills.length === 0}
            onClick={applyFilter}
            className="w-full lg:w-auto bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out"
          >
            Apply Filter
          </button>
          <button
            disabled={input.length === 0}
            onClick={clearFilters}
            className="w-full lg:w-auto bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md transition duration-300 ease-in-out"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default FSB;
