import React, { useState } from "react";
import JobImage from "/JobImage.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const errors = {};
    if (formData.email.trim() === "") {
      errors.email = "Email is required";
    }
    if (formData.password.trim() === "") {
      errors.password = "Password is required";
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    setErrors({});
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      const userData = {
        token: response.data.token,
        name: response.data.user.name,
      };
      localStorage.setItem("userData", JSON.stringify(userData));
      alert("Successfully logged in!");
      navigate("/");
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error.response.data);
      } else if (error.request) {
        console.error("Network Error:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center space-y-4">
        <div>
          <h1 className="font-bold text-3xl mb-4">Already have an account?</h1>
          <p className="mb-4">Your personal job finder is here</p>
        </div>
        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded"
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded"
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-700 text-white p-3 rounded w-[40%]"
          >
            Sign in
          </button>
        </form>
        <div className="flex space-x-2">
          <p>Don't have an account?</p>
          <Link to="/register" className="underline">
            Sign up
          </Link>
        </div>
      </div>
      {/* Right container */}
      <div className="hidden md:block md:w-1/2 h-screen overflow-hidden">
        <img
          src={JobImage}
          className="w-full h-full object-cover"
          alt="Job Image"
        />
      </div>
    </div>
  );
}

export default Login;
