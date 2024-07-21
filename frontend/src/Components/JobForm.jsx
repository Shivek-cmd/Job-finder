import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useJobs } from "../context/JobProvider";
import axios from "axios";

function JobForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { createJob, updateJobById } = useJobs();

  const initialFormData = {
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
  };

  const [formData, setFormData] = useState(initialFormData);
  const [skillInput, setSkillInput] = useState("");

  useEffect(() => {
    if (id) {
      const fetchJobDetails = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/jobs/get/${id}`
          );
          const jobData = response.data;
          setFormData({
            name: jobData.name,
            logo: jobData.logo,
            position: jobData.position,
            salary: jobData.salary,
            jobType: jobData.jobType,
            remote: jobData.remote,
            location: jobData.location,
            description: jobData.description,
            about: jobData.about,
            skills: jobData.skills,
            information: jobData.information,
          });
        } catch (error) {
          console.error("Error fetching job details:", error);
        }
      };

      fetchJobDetails();
    }
  }, [id]);

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
      e.preventDefault();
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

    try {
      if (id) {
        await updateJobById(formData, id);
      } else {
        await createJob(formData);
      }
      navigate("/");
    } catch (error) {
      console.error(`Error ${id ? "updating" : "creating"} job:`, error);
    }
  };

  const handleClear = () => {
    setFormData(initialFormData);
    setSkillInput("");
  };

  return (
    <div className="w-full lg:w-3/4 mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200 flex flex-col lg:flex-row overflow-hidden">
      <div className="lg:w-3/5 p-6 space-y-6">
        <h1 className="text-3xl font-bold mb-6">
          {id ? "Update Job Description" : "Add Job Description"}
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-2">
              <label className="font-semibold text-gray-700">
                Company Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your company name here"
                value={formData.name}
                onChange={handleChange}
                className="p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-semibold text-gray-700">Logo URL</label>
              <input
                type="text"
                name="logo"
                placeholder="Enter the logo URL here"
                value={formData.logo}
                onChange={handleChange}
                className="p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-semibold text-gray-700">
                Job Position
              </label>
              <input
                type="text"
                name="position"
                placeholder="Enter the job position"
                value={formData.position}
                onChange={handleChange}
                className="p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-semibold text-gray-700">
                Monthly Salary
              </label>
              <input
                type="text"
                name="salary"
                placeholder="Enter the monthly salary"
                value={formData.salary}
                onChange={handleChange}
                className="p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-semibold text-gray-700">Job Type</label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select Job Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-semibold text-gray-700">
                Remote/Office
              </label>
              <select
                name="remote"
                value={formData.remote}
                onChange={handleChange}
                className="p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select Option</option>
                <option value="Remote">Remote</option>
                <option value="Office">Office</option>
              </select>
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-semibold text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                placeholder="Enter the job location"
                value={formData.location}
                onChange={handleChange}
                className="p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <label className="font-semibold text-gray-700">
              Job Description
            </label>
            <textarea
              name="description"
              placeholder="Enter the job description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="font-semibold text-gray-700">About Company</label>
            <textarea
              name="about"
              placeholder="Write about the company"
              value={formData.about}
              onChange={handleChange}
              rows="4"
              className="p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="font-semibold text-gray-700">
              Skills Required
            </label>
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                value={skillInput}
                onChange={handleSkillChange}
                onKeyDown={handleAddSkill}
                placeholder="Press Enter to add a skill"
                className="p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-gray-200 p-2 rounded-md flex items-center"
                  >
                    <span>{skill}</span>
                    <FaTimes
                      className="ml-2 cursor-pointer text-red-500 hover:text-red-700"
                      onClick={() => removeSkill(skill)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <label className="font-semibold text-gray-700">
              Additional Information
            </label>
            <textarea
              name="information"
              placeholder="Enter any additional information"
              value={formData.information}
              onChange={handleChange}
              rows="4"
              className="p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
            <button
              type="button"
              onClick={handleClear}
              className="bg-gray-500 hover:bg-gray-600 text-white p-3 rounded-lg transition-colors"
            >
              Clear Form
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg transition-colors"
            >
              {id ? "Update Job" : "Add Job"}
            </button>
          </div>
        </form>
      </div>
      <div className="hidden lg:block lg:w-2/5 bg-gray-100 p-5 rounded-lg border border-gray-200">
        {/* Additional Info or Sidebar */}
      </div>
    </div>
  );
}

export default JobForm;
