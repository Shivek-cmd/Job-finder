import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const token = userData?.token || null;
  const name = userData?.name || "";
  const userName = name.split(" ")[0];

  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/login");
  };

  return (
    <nav className="bg-red-400 w-full flex flex-col sm:flex-row justify-between items-center px-5 py-4 shadow-md rounded-bl-3xl rounded-br-3xl z-50">
      <div className="flex w-full items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-white">
          Jobfinder
        </Link>
        <button
          className="text-white text-2xl sm:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div
        className={`flex-col sm:flex-row sm:flex sm:items-center ${
          isMenuOpen ? "flex" : "hidden"
        } sm:flex space-y-4 sm:space-y-0 sm:space-x-4 mt-4 sm:mt-0`}
      >
        {token ? (
          <>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-transparent rounded-md text-white font-semibold hover:bg-gray-100 hover:text-red-400 transition duration-300 ease-in-out"
            >
              Logout
            </button>
            <div className="px-4 py-2 rounded-md text-white font-semibold">
              Hello, {userName}
            </div>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 border border-transparent rounded-md text-white font-semibold hover:bg-gray-100 hover:text-red-400 transition duration-300 ease-in-out"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 border border-transparent rounded-md text-white font-semibold hover:bg-gray-100 hover:text-red-400 transition duration-300 ease-in-out"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
