import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);

  const fetchAllJobs = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/jobs/all");
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchAllJobs();
  }, []);

  const createJob = async (formData) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const token = userData ? userData.token : null;
    try {
      const response = await axios.post(
        "http://localhost:3000/api/jobs/create",
        {
          ...formData,
          token,
        }
      );
      setJobs((prevJobs) => [...prevJobs, response.data]);
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  const deleteJobById = async (jobId) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const token = userData ? userData.token : null;
    try {
      await axios.delete(`http://localhost:3000/api/jobs/delete/${jobId}`, {
        data: { token },
      });
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const updateJobById = async (formData, jobId) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const token = userData ? userData.token : null;

    try {
      const response = await axios.patch(
        `http://localhost:3000/api/jobs/update/${jobId}`,
        {
          ...formData,
          token,
        }
      );
      // Update the job list with the updated job
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job._id === jobId ? { ...job, ...response.data } : job
        )
      );
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        setJobs,
        fetchAllJobs,
        deleteJobById,
        createJob,
        updateJobById,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => useContext(JobContext);
