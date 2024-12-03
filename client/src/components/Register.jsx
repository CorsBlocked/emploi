import React, { useState, useEffect } from "react";
import axios from "axios";
import Login from "../assets/Login.png";

const Register = () => {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    password: "",
    classe: "",
    agreeTerms: false, // Adding state for terms and conditions
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [classes, setClasses] = useState([]); // State to store fetched classes

  // Fetch the classes when the component mounts
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get("http://localhost:5500/classes/all");
        setClasses(response.data); // Set the fetched classes to state
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, []);

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
      const response = await axios.post("http://localhost:5500/etudiants/create", {
        nom: formData.nom,
        email: formData.email,
        mdp: formData.password,
        classe: formData.classe,
      });

      setSuccessMessage("Registration successful! Please log in.");
      setErrorMessage("");
      setFormData({
        nom: "",
        email: "",
        password: "",
        classe: "",
        agreeTerms: false, // Resetting terms checkbox
      });
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || "Failed to register");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
      console.error(error);
    }
  };

  return (
    <div className="h-screen flex">
      {/* Left Side: Illustration */}
      <div className="hidden lg:flex w-1/2 bg-gray-100 justify-center items-center">
        <img
          src={Login}
          alt="Register page illustration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="max-w-md w-full">
          <h2 className="text-3xl font-bold mb-4">Register</h2>

          {errorMessage && (
            <div className="mb-4 text-red-500">{errorMessage}</div>
          )}
          {successMessage && (
            <div className="mb-4 text-green-500">{successMessage}</div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name Input */}
            <input
              type="text"
              name="nom"
              placeholder="First name"
              className="w-full p-3 border border-gray-300 rounded-md"
              value={formData.nom}
              onChange={handleChange}
              required
            />

            {/* Email and Password Inputs */}
            <div className="flex space-x-4">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-1/2 p-3 border border-gray-300 rounded-md"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-1/2 p-3 border border-gray-300 rounded-md"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Class Selection */}
            <div>
              <select
                name="classe" // Corrected the name to match state property
                className="w-full p-3 border border-gray-300 rounded-md"
                value={formData.classe}
                onChange={handleChange}
                required
              >
                <option value="">Select Class</option>
                {classes.map((classItem) => (
                  <option key={classItem._id} value={classItem._id}>
                    {classItem.name}
                  </option>
                ))}
              </select>
            </div>

      

            {/* Terms and Conditions */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="mr-2"
                required
              />
              <label className="text-gray-600">
                I agree to all terms, privacy policies, and fees
              </label>
            </div>

            {/* Submit Button */}
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
