import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import FSB from "../Components/FSB";
import JobCards from "../Components/JobCards";

function Homepage() {
  const [jobs, setJobs] = useState([]);

  return (
    <div>
      <Navbar />
      <FSB setJobs={setJobs} />
      <JobCards jobs={jobs} />
    </div>
  );
}

export default Homepage;
