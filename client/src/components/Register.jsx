import React, { useState } from "react";
import Login from "../assets/Login.png"

const Register = () => {

  return (
    <div className="h-screen flex">
      {/* Left Side: Illustration */}
      <div className="hidden lg:flex w-1/2 bg-gray-100 justify-center items-center">
        <img
          src={Login}
          alt="register image page"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="max-w-md w-full">
          <h2 className="text-3xl font-bold mb-4">Register</h2>
          <p className="text-gray-600 mb-8">
            Manage all your inventory efficiently. Let’s get you all set up so
            you can verify your personal account and begin setting up your work
            profile.
          </p>

          <form className="space-y-4">
            {/* First Name and Last Name */}
            <div className="flex space-x-4">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                className="w-1/2 p-3 border border-gray-300 rounded-md"
              
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                className="w-1/2 p-3 border border-gray-300 rounded-md"
              
                required
              />
            </div>

            {/* Email and Phone */}
            <div className="flex space-x-4">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-1/2 p-3 border border-gray-300 rounded-md"
               
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone no."
                className="w-1/2 p-3 border border-gray-300 rounded-md"
               
                required
              />
            </div>

            {/* Password */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-md"
           
              required
            />

            {/* Terms and Conditions */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="agreeTerms"
           
                className="mr-2"
              />
              <label className="text-gray-600">
                I agree to all terms, privacy policies, and fees
              </label>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full bg-[#b24c6a] text-white py-3 rounded-md hover:bg-[#9e2145] transition"
            >
              Sign up
            </button>

            {/* Login Link */}
            <p className="text-gray-600 mt-4 text-center">
              Already have an account?{" "}
              <a href="/login" className="text-blue-500 hover:underline">
                Log in
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
