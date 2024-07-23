import React, { useState, useEffect, useRef } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
const FSB = ({ jobs, setJobs }) => {
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [input, setInput] = useState("");
  const { token } = JSON.parse(localStorage.getItem("userData"));
  const skillSelectRef = useRef(null);
  const searchByText = async (input) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/jobs/search/${input}`
      );

      setJobs(response.data);

      console.log("searchByText api is running");
    } catch (error) {
      console.error("Error searching for jobs:", error);
    }
  };
  const fetchAllJobs = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/jobs/all");
      setJobs(response.data);

      console.log("fetchAllJobs api is running");
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };
  useEffect(() => {
    if (input) {
      searchByText(input);
    } else {
      fetchAllJobs();
    }
  }, [input]);
  useEffect(() => {
    const array = [
      "JavaScript",
      "Node.js",
      "React",
      "CSS",
      "SQL",
      "Azure",
      "Docker",
      "Python",
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
    if (selectedSkills.length == 0) {
      setSelectedSkills([]);
    } else {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    }
  };
  const filterBySkills = async (selectedSkills) => {
    try {
      const skillsParam = Array.isArray(selectedSkills)
        ? selectedSkills.join(",")
        : selectedSkills;

      const url = `http://localhost:3000/api/jobs/filter/${encodeURIComponent(
        skillsParam
      )}`;

      const response = await axios.get(url);

      // Update jobs with the filtered result
      setJobs(response.data);
      console.log("filterBySkills api is running");
    } catch (error) {
      console.error("Error filtering jobs by skills:", error);
    }
  };

  const applyFilter = () => {
    if (selectedSkills.length == 0) {
      fetchAllJobs();
    } else {
      filterBySkills(selectedSkills);
    }
  };

  const clearFilters = () => {
    setSelectedSkills([]);
    setInput("");
    if (skillSelectRef.current) {
      skillSelectRef.current.value = "";
    }
    fetchAllJobs();
  };

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
          ref={skillSelectRef} //
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
