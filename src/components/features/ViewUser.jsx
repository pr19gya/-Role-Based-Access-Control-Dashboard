import React, { useEffect, useState } from "react";
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

    const confirmDelete = window.confirm("Are you sure you want to delete the user?");
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
    <div>
      {user.map((u) => (
        <div key={u.id}>
          <div>Username: {u.username}</div>
          <div>
            Role:{" "}
            {editingUserId === u.id ? (
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
              >
                <option value="">--Select Role--</option>
                <option value="admin">Admin</option>
                <option value="supportAgent">Support Agent</option>
                <option value="employee">Employee</option>
              </select>
            ) : (
              u.role
            )}
          </div>
          {editingUserId === u.id ? (
            <>
              <button onClick={() => editRole(u.id)}>Save</button>
              <button onClick={() => setEditingUserId(null)}>Cancel</button>
            </>
          ) : (
            <button onClick={() => setEditingUserId(u.id)}>Edit</button>
          )}
          <button onClick={() => deleteUser(u.id, u.role)}>Delete</button>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default ViewUser;
