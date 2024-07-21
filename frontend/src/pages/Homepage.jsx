import React from "react";
import Navbar from "../Components/Navbar.jsx";
import FSB from "../Components/FSB.jsx";
import JobCards from "../Components/JobCards.jsx";

function Homepage() {
  return (
    <div>
      <Navbar />
      <FSB />
      <JobCards />
    </div>
  );
}

export default Homepage;
