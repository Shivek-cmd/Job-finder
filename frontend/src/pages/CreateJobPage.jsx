import React, { useState } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import { useAuth } from "../context/AuthProvider.jsx";
function CreateJobPage() {
  const [authUser, setAuthUser] = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    position: "",
    salary: "",
    jobType: "",
    remote: "",
    location: "",
    description: "",
    about: "",
    skills: [],
    information: "",
  });

  const [skillInput, setSkillInput] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSkillChange = (e) => {
    setSkillInput(e.target.value);
  };

  const handleAddSkill = (e) => {
    if (e.key === "Enter" && skillInput.trim() !== "") {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput.trim()],
      });
      setSkillInput("");
    }
  };

  const removeSkill = (skill) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skill),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Assuming token is retrieved and stored in local storage or state
    const token = localStorage.getItem(authUser.token);

    const response = await axios.post(
      "http://localhost:3000/api/jobs/create",
      { ...formData, "auth-token": token }, // Send token in the body
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  return (
    <div className="w-screen max-h-screen flex overflow-hidden">
      <div className="w-[60%] bg-slate-200 p-6 space-y-4 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Add Job Description</h1>
        <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
          <div className="flex flex-row items-center space-x-4">
            <label className="w-[30%] font-semibold">Company Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your company name here"
              value={formData.name}
              onChange={handleChange}
              className="p-2 border rounded flex-1"
            />
          </div>
          <div className="flex flex-row items-center space-x-4">
            <label className="w-[30%] font-semibold">Logo URL</label>
            <input
              type="text"
              name="logo"
              placeholder="Enter the logo URL here"
              value={formData.logo}
              onChange={handleChange}
              className="p-2 border rounded flex-1"
            />
          </div>
          <div className="flex flex-row items-center space-x-4">
            <label className="w-[30%] font-semibold">Job Position</label>
            <input
              type="text"
              name="position"
              placeholder="Enter the job position"
              value={formData.position}
              onChange={handleChange}
              className="p-2 border rounded flex-1"
            />
          </div>
          <div className="flex flex-row items-center space-x-4">
            <label className="w-[30%] font-semibold">Monthly Salary</label>
            <input
              type="text"
              name="salary"
              placeholder="Enter the monthly salary"
              value={formData.salary}
              onChange={handleChange}
              className="p-2 border rounded flex-1"
            />
          </div>
          <div className="flex flex-row items-center space-x-4">
            <label className="w-[30%] font-semibold">Job Type</label>
            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="p-2 border rounded flex-1"
            >
              <option value="">Select Job Type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
          <div className="flex flex-row items-center space-x-4">
            <label className="w-[30%] font-semibold">Remote/Office</label>
            <select
              name="remote"
              value={formData.remote}
              onChange={handleChange}
              className="p-2 border rounded flex-1"
            >
              <option value="">Select Option</option>
              <option value="Remote">Remote</option>
              <option value="Office">Office</option>
            </select>
          </div>
          <div className="flex flex-row items-center space-x-4">
            <label className="w-[30%] font-semibold">Location</label>
            <input
              type="text"
              name="location"
              placeholder="Enter the job location"
              value={formData.location}
              onChange={handleChange}
              className="p-2 border rounded flex-1"
            />
          </div>
          <div className="flex flex-row items-start space-x-4">
            <label className="w-[30%] font-semibold">Job Description</label>
            <textarea
              name="description"
              placeholder="Enter the job description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="p-2 border rounded flex-1"
            />
          </div>
          <div className="flex flex-row items-start space-x-4">
            <label className="w-[30%] font-semibold">About Company</label>
            <textarea
              name="about"
              placeholder="Write about the company"
              value={formData.about}
              onChange={handleChange}
              rows="4"
              className="p-2 border rounded flex-1"
            />
          </div>
          <div className="flex flex-row items-start space-x-4">
            <label className="w-[30%] font-semibold">Skills Required</label>
            <div className="flex flex-col">
              <input
                type="text"
                value={skillInput}
                onChange={handleSkillChange}
                onKeyDown={handleAddSkill}
                placeholder="Press Enter to add a skill"
                className="p-2 border rounded flex-1 "
              />
              <div className="flex justify-center  space-x-4 mt-2">
                <div className="flex flex-wrap space-x-2">
                  {formData.skills.map((skill, index) => (
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
            </div>
          </div>
          <div className="flex flex-row items-start space-x-4">
            <label className="w-[30%] font-semibold">
              Additional Information
            </label>
            <textarea
              name="information"
              placeholder="Enter any additional information"
              value={formData.information}
              onChange={handleChange}
              rows="4"
              className="p-2 border rounded flex-1"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md mt-4"
          >
            Add Job
          </button>
        </form>
      </div>
      <div className="w-[40%] bg-red-400 p-5">Additional Info or Sidebar</div>
    </div>
  );
}

export default CreateJobPage;
