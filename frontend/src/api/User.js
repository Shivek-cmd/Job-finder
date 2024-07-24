import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/auth`;

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
    console.log("Succesfully Logged in");
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const registerUser = async (name, email, password, mobile) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      name,
      email,
      password,
      mobile,
    });
    console.log("Succesfully Sign up");
    return response.data;
  } catch (error) {
    throw error;
  }
};
