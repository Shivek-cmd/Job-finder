import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider.jsx";
function Navbar() {
  const [authUser, setAuthUser] = useAuth();
  const navigate = useNavigate();

  const Username = authUser.name.split(" ")[0];

  const handleLogout = () => {
    // Clear user data from localStorage and context
    localStorage.removeItem("userData");
    setAuthUser(null);
    navigate("/login");
  };

  return (
    <div className="bg-red-400 flex justify-between items-center px-5 py-4 shadow-md rounded-bl-3xl rounded-br-3xl">
      <h1 className="text-2xl font-bold text-white">Jobfinder</h1>

      <div className="flex space-x-2">
        {authUser ? (
          <>
            <button
              onClick={handleLogout}
              className="px-5 py-2  rounded-md text-white font-semibold hover:bg-gray-100 duration-200 transition-colors"
            >
              Logout
            </button>
            <div className="px-5 py-2  rounded-md text-white font-semibold  duration-200 transition-colors">
              Hello {Username}!!!
            </div>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-5 py-2 border rounded-md text-white font-semibold hover:bg-gray-100 duration-200 transition-colors"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-5 py-2 border rounded-md text-white font-semibold hover:bg-gray-100 duration-200 transition-colors"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
