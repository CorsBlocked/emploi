import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import LoginN from "../assets/Login.png"; // Ensure the image path is correct

const LoginAdmin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errorMessage, setErrorMessage] = useState("");
  
  const navigate = useNavigate(); // navgate hook 

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    try {
      // Check if the email and password match the predefined credentials
      if (email === "admin@admin.com" && password === "admin") {
        setErrorMessage("");  // Clear error message on successful submit
        console.log("User logged in successfully:", formData);
        
        // home page etudiant 
        navigate("/admin");
      } else {
        setErrorMessage("Invalid email or password."); // Error message for wrong credentials
      }
    } catch (error) {
      setErrorMessage("Login failed, please try again.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Left side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-white p-8">
        <h2 className="text-3xl font-bold mb-4">Login Admin</h2>
        <p className="text-gray-600 mb-6">Hello Admin, enter in here!</p>

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

        

        {/* Submit Button */}
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full lg:w-3/4 bg-[#b24c6a] text-white py-3 rounded-md hover:bg-[#9e2145] mb-4"
        >
          Login
        </button>

       
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

export default LoginAdmin;
