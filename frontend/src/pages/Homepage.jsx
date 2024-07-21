import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar.jsx";
import FSB from "../Components/FSB.jsx"; // Import the FSB component
import JobCards from "../Components/JobCards.jsx"; // Import the JobCards component
import axios from "axios";

function Homepage() {
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

  const deleteJobById = async (jobId) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const token = userData ? userData.token : null;
    try {
      await axios.delete(`http://localhost:3000/api/jobs/delete/${jobId}`, {
        data: { token },
      });
      setJobs(jobs.filter((job) => job._id !== jobId)); // Remove the deleted job from the job list
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const updateJobsById = async (jobId) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const token = userData ? userData.token : null;
    try {
      await axios.patch(`http://localhost:3000/api/jobs/update/${jobId}`, {
        data: { token },
      });
      setJobs(jobs.filter((job) => job._id !== jobId)); // Remove the deleted job from the job list
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };
  return (
    <div>
      <Navbar />
      <FSB jobs={jobs} />
      <JobCards jobs={jobs} onDelete={deleteJobById} />
    </div>
  );
}

export default Homepage;
