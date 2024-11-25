import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { base_url } from "../../base_url";

const ViewUser = () => {
  const [user, setUser] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [newRole, setNewRole] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${base_url}users`);
        if (response.ok) {
          const users = await response.json();
          setUser(users);
        } else {
          console.log("Unable to fetch data");
        }
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };
    fetchUsers();
  }, []);

  const deleteUser = async (userId, userRole) => {
    if (userRole === "admin") {
      window.alert("Admin cannot be deleted");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete the user?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${base_url}users/${userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setUser((prevUser) => prevUser.filter((u) => u.id !== userId));
        console.log("User deleted successfully");
      } else {
        console.log("Unable to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  const editRole = async (userId) => {
    if (!newRole) {
      alert("Please select a role before saving.");
      return;
    }

    try {
      const response = await fetch(`${base_url}users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (response.ok) {
        setUser((prevUsers) =>
          prevUsers.map((u) =>
            u.id === userId ? { ...u, role: newRole } : u
          )
        );
        setEditingUserId(null);
        setNewRole("");
        console.log("Role updated successfully");
        alert("Please refresh the page to see the changes.");
      } else {
        console.log("Unable to update role");
        alert("Please refresh the page to see the changes.");
      }
    } catch (error) {
      console.error("Error updating role:", error.message);
    }
  };

  return (
    <motion.div
      className="space-y-6 bg-gray-900 text-white rounded-xl shadow-lg max-w-screen-lg mx-auto px-4 sm:px-6 py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {user.map((u) => (
          <motion.div
            key={u.id}
            className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex justify-between items-center">
              <div className="text-lg sm:text-xl font-semibold text-indigo-300">
                {u.username}
              </div>
              <div
                className={`text-sm font-medium ${
                  u.role === "admin" ? "text-red-400" : "text-gray-400"
                }`}
              >
                {u.role}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-gray-500 text-sm">Role: </div>
              {editingUserId === u.id ? (
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full p-3 mt-2 text-black bg-white rounded-lg shadow-sm"
                >
                  <option value="">--Select Role--</option>
                  <option value="admin">Admin</option>
                  <option value="supportAgent">Support Agent</option>
                  <option value="employee">Employee</option>
                </select>
              ) : (
                <div className="mt-2 text-gray-300">{u.role}</div>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {editingUserId === u.id ? (
                <>
                  <motion.button
                    onClick={() => editRole(u.id)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md w-full sm:w-auto"
                    whileHover={{ scale: 1.05 }}
                  >
                    Save
                  </motion.button>
                  <motion.button
                    onClick={() => setEditingUserId(null)}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg shadow-md w-full sm:w-auto"
                    whileHover={{ scale: 1.05 }}
                  >
                    Cancel
                  </motion.button>
                </>
              ) : (
                <motion.button
                  onClick={() => setEditingUserId(u.id)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg shadow-md w-full sm:w-auto"
                  whileHover={{ scale: 1.05 }}
                >
                  Edit
                </motion.button>
              )}
              <motion.button
                onClick={() => deleteUser(u.id, u.role)}
                className="px-4 py-2 bg-red-800 hover:bg-red-700 text-white rounded-lg shadow-md w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
              >
                Delete
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ViewUser;
