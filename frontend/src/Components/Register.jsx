import  { useState } from "react";
import JobImage from "/JobImage.png";
import { registerUser } from "../api/User"; // Adjust the path as needed
import { Link, useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner"; // Import the loader from react-loader-spinner

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    checkbox: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // New state for loading

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
    
    setLoading(true); // Set loading to true when registration starts

    try {
      const data = await registerUser(
        formData.name,
        formData.email,
        formData.password,
        formData.mobile
      );

      const userData = {
        token: data.token,
        name: data.user.name,
      };
      localStorage.setItem("userData", JSON.stringify(userData));
      alert("Successfully signed up!");
      navigate("/");
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error.response.data);
        alert("Registration failed. Please try again.");
      } else if (error.request) {
        console.error("Network Error:", error.request);
        alert("Network error, please try again.");
      } else {
        console.error("Error:", error.message);
        alert("An error occurred, please try again.");
      }
    } finally {
      setLoading(false); // Set loading to false once registration is complete
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

          {/* Show loader or button based on the loading state */}
          <button
            type="submit"
            className={`bg-red-500 hover:bg-red-700 text-white p-3 rounded w-[40%] flex justify-center items-center ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <TailSpin 
                height="30" 
                width="30" 
                color="white" 
                ariaLabel="loading" 
              />
            ) : (
              "Create Account"
            )}
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
