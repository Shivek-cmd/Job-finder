import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-xl mt-4">Page Not Found</p>
      <p className="mt-2">
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </p>
      <Link
        to="/"
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Go to Homepage
      </Link>
    </div>
  );
}

export default NotFound;
