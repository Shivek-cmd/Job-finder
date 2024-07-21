import React, { useState } from "react";
import JobImage from "/JobImage.png";
import axios from "axios";
import { Link } from "react-router-dom";
function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    checkbox: false,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const errors = {};
    if (formData.name.trim() === "") {
      errors.name = "Name is required";
    }
    if (formData.email.trim() === "") {
      errors.email = "Email is required";
    }
    if (formData.password.trim() === "") {
      errors.password = "Password is required";
    }
    if (formData.mobile.trim() === "") {
      errors.mobile = "Mobile number is required";
    }
    if (!formData.checkbox) {
      errors.checkbox = "You must accept the terms and conditions";
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    setErrors({});
    // Handle registration logic here
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          mobile: formData.mobile,
        }
      );
      console.log(response.data);
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
      {/* Left container */}
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center space-y-4">
        <div>
          <h1 className="font-bold text-3xl mb-4">Create an Account</h1>
          <p className="mb-4">Your personal job finder is here</p>
        </div>
        <form onSubmit={handleRegister} className="flex flex-col space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded"
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
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
            type="text"
            name="mobile"
            placeholder="Mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded"
          />
          {errors.mobile && <p className="text-red-500">{errors.mobile}</p>}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded"
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="checkbox"
              id="terms"
              checked={formData.checkbox}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="terms" className="text-sm">
              I accept the terms and conditions
            </label>
          </div>
          {errors.checkbox && <p className="text-red-500">{errors.checkbox}</p>}
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-700 text-white p-3 rounded w-[40%]"
          >
            Create Account
          </button>
        </form>
        <div className="flex space-x-2">
          <p>Already have an account?</p>
          <Link to="/login" className="underline">
            Sign in
          </Link>
        </div>
      </div>
      {/* Right container */}
      <div className="hidden md:block md:w-1/2 h-screen overflow-hidden">
        <img
          src={JobImage}
          className="w-full h-screen object-cover"
          alt="Job Image"
        />
      </div>
    </div>
  );
}

export default Register;
