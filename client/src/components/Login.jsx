import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginN from "../assets/Login.png"

const Login = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-white p-8">
        <h2 className="text-3xl font-bold mb-4">Login</h2>
        <p className="text-gray-600 mb-6">See your growth and get support!</p>
        
   
        <button className="flex items-center justify-center w-full lg:w-3/4 border border-gray-300 rounded-md py-2 mb-6 hover:bg-gray-100">
          <img src="https://img.icons8.com/color/24/google-logo.png" alt="Google Logo" className="mr-2" />
          Sign in with Google
        </button>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full lg:w-3/4 p-3 border border-gray-300 rounded-md mb-4"
       
          required
        />

        <input
          type="password"
          placeholder="Minimum 8 characters"
          className="w-full lg:w-3/4 p-3 border border-gray-300 rounded-md mb-4"

          required
        />

        <div className="w-full lg:w-3/4 flex items-center justify-between mb-4">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Remember me
          </label>
          <a href="#" className="text-blue-500 hover:underline">Forgot password?</a>
        </div>

        <button
          className="w-full lg:w-3/4 bg-[#b24c6a] text-white py-3 rounded-md hover:bg-[#9e2145] mb-4"
  
        >
          Login
        </button>

        <p className="text-gray-600">
          Not registered yet?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Create a new account
          </Link>
        </p>
      </div>

      <div className="hidden lg:flex w-1/2 bg-gray-100 justify-center items-center">
        <img
          src={LoginN}
          alt="login page"
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
