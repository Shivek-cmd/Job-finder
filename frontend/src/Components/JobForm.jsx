import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

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

function JobForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState(initialFormData);
  const [skillInput, setSkillInput] = useState("");

  useEffect(() => {
    if (id) {
      const fetchJobDetails = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/jobs/get/${id}`
          );
          setFormData(response.data);
        } catch (error) {
          console.error("Error fetching job details:", error);
        }
      };

      fetchJobDetails();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSkillChange = (e) => setSkillInput(e.target.value);

  const handleAddSkill = (e) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      setFormData((prevData) => ({
        ...prevData,
        skills: [...prevData.skills, skillInput.trim()],
      }));
      setSkillInput("");
    }
  };

  const removeSkill = (skill) => {
    setFormData((prevData) => ({
      ...prevData,
      skills: prevData.skills.filter((s) => s !== skill),
    }));
  };

  const createJob = async () => {
    const token = JSON.parse(localStorage.getItem("userData"))?.token;
    try {
      await axios.post("http://localhost:3000/api/jobs/create", {
        ...formData,
        token,
      });
      console.log("createJob api is running");
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  const updateJobById = async () => {
    const token = JSON.parse(localStorage.getItem("userData"))?.token;
    try {
      await axios.patch(`http://localhost:3000/api/jobs/update/${id}`, {
        ...formData,
        token,
      });
      console.log("updateJobById api is running");
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      id ? await updateJobById() : await createJob();
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
            {[
              {
                name: "name",
                placeholder: "Enter your company name here",
                label: "Company Name",
              },
              {
                name: "logo",
                placeholder: "Enter the logo URL here",
                label: "Logo URL",
              },
              {
                name: "position",
                placeholder: "Enter the job position",
                label: "Job Position",
              },
              {
                name: "salary",
                placeholder: "Enter the monthly salary",
                label: "Monthly Salary",
              },
              {
                name: "location",
                placeholder: "Enter the job location",
                label: "Location",
              },
            ].map(({ name, placeholder, label }) => (
              <div key={name} className="flex flex-col space-y-2">
                <label className="font-semibold text-gray-700">{label}</label>
                <input
                  type="text"
                  name={name}
                  placeholder={placeholder}
                  value={formData[name]}
                  onChange={handleChange}
                  className="p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            ))}
            <div className="flex flex-col space-y-2">
              <label className="font-semibold text-gray-700">Job Type</label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select Job Type</option>
                {["Full-time", "Part-time", "Contract", "Internship"].map(
                  (type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  )
                )}
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
                {["Remote", "Office"].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {[
            {
              name: "description",
              label: "Job Description",
              rows: 4,
              placeholder: "Enter the job description",
            },
            {
              name: "about",
              label: "About Company",
              rows: 4,
              placeholder: "Write about the company",
            },
            {
              name: "information",
              label: "Additional Information",
              rows: 4,
              placeholder: "Enter any additional information",
            },
          ].map(({ name, label, rows, placeholder }) => (
            <div key={name} className="flex flex-col space-y-2">
              <label className="font-semibold text-gray-700">{label}</label>
              <textarea
                name={name}
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleChange}
                rows={rows}
                className="p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          ))}
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