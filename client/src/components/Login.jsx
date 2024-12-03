import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginN from "../assets/Login.png"; // Ensure the image path is correct
import axios from "axios"; // Import axios for API requests

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Use the navigate hook for redirection

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:5500/etudiants/login", {
        email: formData.email,
        mdp: formData.password,
      });
  
      if (response.status === 200) {
        setErrorMessage(""); // Clear error message on successful submit
        console.log("Login successful:", response.data);
  
        // Extract user ID from the response
        const userId = response.data.etudiant.id; // Correctly extract the ID
        console.log("Extracted userId:", userId); // Debugging
  
        // Redirect to HomeEtudiant with user ID
        navigate("/HomeEtudiant", { state: { userId } });
      }
    } catch (error) {
      setErrorMessage("Invalid email or password");
      console.error("Error during login:", error); // Debugging
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Left side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-white p-8">
        <h2 className="text-3xl font-bold mb-4">Login</h2>
        <p className="text-gray-600 mb-6">Hello student, enter in here!</p>

        {/* Error message display */}
        {errorMessage && (
          <div className="mb-4 text-red-500">{errorMessage}</div>
        )}

        {/* Email Input */}
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="w-full lg:w-3/4 p-3 border border-gray-300 rounded-md mb-4"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {/* Password Input */}
        <input
          type="password"
          name="password"
          placeholder="Minimum 8 characters"
          className="w-full lg:w-3/4 p-3 border border-gray-300 rounded-md mb-4"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {/* Remember me and Forgot password */}
        <div className="w-full lg:w-3/4 flex items-center justify-between mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="mr-2"
            />
            Remember me
          </label>
          
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full lg:w-3/4 bg-[#b24c6a] text-white py-3 rounded-md hover:bg-[#9e2145] mb-4"
        >
          Login
        </button>

        {/* Register Link */}
        <p className="text-gray-600">
          Not registered yet?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Create a new account
          </Link>
        </p>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:flex w-1/2 bg-gray-100 justify-center items-center">
        <img
          src={LoginN}
          alt="login page"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default Login;
