import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/jobs`;
export const fetchAllJobs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

export const searchJobsByText = async (input) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search/${input}`);
    return response.data;
  } catch (error) {
    console.error("Error searching for jobs:", error);
    throw error;
  }
};

export const filterJobsBySkills = async (skills) => {
  try {
    const skillsParam = Array.isArray(skills) ? skills.join(",") : skills;
    const url = `${API_BASE_URL}/filter/${encodeURIComponent(skillsParam)}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error filtering jobs by skills:", error);
    throw error;
  }
};

export const fetchJobDetailsById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get/${id}`);
    console.log("fetchJobDetailsById api is running");
    return response.data;
  } catch (error) {
    console.error("Error fetching job details:", error);
    throw error;
  }
};

export const deleteJobById = async (id, token) => {
  try {
    await axios.delete(`${API_BASE_URL}/delete/${id}`, {
      data: { token },
    });
    console.log("deleteJobById api is running");
  } catch (error) {
    console.error("Error deleting job:", error);
    throw error;
  }
};
export const createJob = async (formData) => {
  const token = JSON.parse(localStorage.getItem("userData"))?.token;
  try {
    await axios.post(`${API_BASE_URL}/create`, { ...formData, token });
    console.log("Job created successfully");
  } catch (error) {
    console.error("Error creating job:", error);
    throw error;
  }
};
export const updateJobById = async (id, formData) => {
  const token = JSON.parse(localStorage.getItem("userData"))?.token;
  try {
    await axios.patch(`${API_BASE_URL}/update/${id}`, { ...formData, token });
    console.log("Job updated successfully");
  } catch (error) {
    console.error("Error updating job:", error);
    throw error;
  }
};
