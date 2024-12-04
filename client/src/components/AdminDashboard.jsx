import React from "react";
import Sidebar from "./Sidebar";
import dashboardImage from '../assets/Whomepage.png'; // Import the image

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-grow p-6">
        {/* Header Section */}
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Welcome Admin </h1>
        </header>

        {/* Content Section */}
        <div className="flex flex-col gap-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-white shadow rounded-lg">
              <h2 className="text-gray-800 text-xl font-bold">Total Users</h2>
              <p className="text-gray-600 mt-2">150 Active Users</p>
            </div>
            <div className="p-4 bg-white shadow rounded-lg">
              <h2 className="text-gray-800 text-xl font-bold">Classes Scheduled</h2>
              <p className="text-gray-600 mt-2">320 This Month</p>
            </div>
            <div className="p-4 bg-white shadow rounded-lg">
              <h2 className="text-gray-800 text-xl font-bold">Pending Requests</h2>
              <p className="text-gray-600 mt-2">12 New Requests</p>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex justify-center">
            <img
              src={dashboardImage} // Use the imported image
              alt="Dashboard Illustration"
              className="rounded-lg shadow-lg" // Ensure full width
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
