import React, { useState } from "react";
import Navbar from "../Components/Navbar.jsx";
import FSB from "../Components/FSB.jsx"; // Import the FSB component
import JobCards from "../Components/JobCards.jsx"; // Import the JobCards component
import jobs from "../../public/jobs.json";
import axios from "axios";

function Homepage() {
  const [skills, setSkills] = useState([
    "Frontend",
    "Backend",
    "JavaScript",
    "DevOps",
  ]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const handleSkills = () => {
    // Fetch or set available skills if needed
  };

  const handleSkillChange = (event) => {
    const newSkill = event.target.value;
    if (newSkill !== "Skills" && !selectedSkills.includes(newSkill)) {
      setSelectedSkills([...selectedSkills, newSkill]);
    }
  };

  const removeSkill = (skillToRemove) => {
    setSelectedSkills(
      selectedSkills.filter((skill) => skill !== skillToRemove)
    );
  };

  const applyFilter = () => {
    const filtered = jobs.filter((job) =>
      selectedSkills.every((skill) => job.skills.includes(skill))
    );
    setFilteredJobs(filtered);
  };

  const clearFilter = () => {
    setSelectedSkills([]);
    setFilteredJobs(jobs); // Reset to the original job list
  };

  return (
    <div>
      <Navbar />
      <FSB
        skills={skills}
        selectedSkills={selectedSkills}
        handleSkills={handleSkills}
        handleSkillChange={handleSkillChange}
        removeSkill={removeSkill}
        applyFilter={applyFilter}
        clearFilter={clearFilter}
      />
      <JobCards jobs={filteredJobs} />
    </div>
  );
}
export default Homepage;
