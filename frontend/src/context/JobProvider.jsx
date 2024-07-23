import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  // const [jobs, setJobs] = useState([]);
  // const fetchAllJobs = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:3000/api/jobs/all");
  //     setJobs(response.data);

  //     console.log("fetchAllJobs api is running");
  //     return jobs;
  //   } catch (error) {
  //     console.error("Error fetching jobs:", error);
  //   }
  // };

  // const searchByText = async (query) => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:3000/api/jobs/search/${query}`
  //     );

  //     setJobs(response.data);
  //     console.log(query);
  //     console.log("searchByText api is running");
  //   } catch (error) {
  //     console.error("Error searching for jobs:", error);
  //   }
  // };

  // const createJob = async (formData) => {
  //   const userData = JSON.parse(localStorage.getItem("userData"));
  //   const token = userData ? userData.token : null;
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:3000/api/jobs/create",
  //       {
  //         ...formData,
  //         token,
  //       }
  //     );
  //     console.log("createJob api is running");
  //     setJobs((prevJobs) => [...prevJobs, response.data]);
  //   } catch (error) {
  //     console.error("Error creating job:", error);
  //   }
  // };

  // const deleteJobById = async (jobId) => {
  //   const userData = JSON.parse(localStorage.getItem("userData"));
  //   const token = userData ? userData.token : null;
  //   try {
  //     await axios.delete(`http://localhost:3000/api/jobs/delete/${jobId}`, {
  //       data: { token },
  //     });
  //     setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
  //     console.log("deleteJobById api is running");
  //   } catch (error) {
  //     console.error("Error deleting job:", error);
  //   }
  // };

  // const updateJobById = async (formData, jobId) => {
  //   const userData = JSON.parse(localStorage.getItem("userData"));
  //   const token = userData ? userData.token : null;

  //   try {
  //     const response = await axios.patch(
  //       `http://localhost:3000/api/jobs/update/${jobId}`,
  //       {
  //         ...formData,
  //         token,
  //       }
  //     );

  //     // Update the job list with the updated job
  //     setJobs((prevJobs) =>
  //       prevJobs.map((job) =>
  //         job._id === jobId ? { ...job, ...response.data } : job
  //       )
  //     );
  //     console.log("updateJobById api is running");
  //   } catch (error) {
  //     console.error("Error updating job:", error);
  //   }
  // };
  const searchByText = async (input) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/jobs/search/${input}`
      );

      setJob(response.data);
      console.log(query);
      console.log("searchByText api is running");
    } catch (error) {
      console.error("Error searching for jobs:", error);
    }
  };
  const filterBySkills = async (skills) => {
    try {
      const skillsParam = Array.isArray(skills) ? skills.join(",") : skills;

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

  return (
    <JobContext.Provider
      value={
        {
          // jobs,
          // setJobs,
          // fetchAllJobs,
          // deleteJobById,
          // createJob,
          // updateJobById,
          // searchByText,
          // filterBySkills,
        }
      }
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => useContext(JobContext);
