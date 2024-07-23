import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import FSB from "../Components/FSB";
import JobCards from "../Components/JobCards";
import axios from "axios";

function Homepage() {
  const [jobs, setJobs] = useState(null);

  const fetchAllJobs = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/jobs/all");
      setJobs(response.data);
      console.log("fetchAllJobs api is running");
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const searchByText = async (query) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/jobs/search/${query}`
      );
      setJobs(response.data);
      console.log("searchByText api is running");
    } catch (error) {
      console.error("Error searching for jobs:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <FSB searchByText={searchByText} fetchAllJobs={fetchAllJobs} />
      <JobCards jobs={jobs} />
    </div>
  );
}

export default Homepage;
