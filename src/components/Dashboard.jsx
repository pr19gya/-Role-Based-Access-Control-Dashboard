import React from "react";
import AdminPanel from "./admin/AdminPanel";
import AgentPanel from "./agent/AgentPanel";
import EmployeePanel from "./employee/EmployeePanel";

const Dashboard = ({ role, logout }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="bg-gray-900 text-white flex flex-wrap justify-between items-center p-4">
        {/* Heading */}
        <div className="text-2xl font-semibold">
          RDBC-Dashboard
        </div>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md mt-2 sm:mt-0"
        >
          Logout
        </button>
      </nav>

      {/* Role-Based Panel Rendering */}
      <div className="p-4">
        {role === "admin" && <AdminPanel />}
        {role === "supportAgent" && <AgentPanel />}
        {role === "employee" && <EmployeePanel />}
      </div>
    </div>
  );
};

export default Dashboard;
