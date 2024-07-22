import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import FSB from "../Components/FSB";
import JobCards from "../Components/JobCards";

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
