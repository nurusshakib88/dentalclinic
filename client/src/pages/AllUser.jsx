import React, { useState, useEffect } from "react";
import axios from "axios";

const AllUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };
    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3001/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId)); // Update state after deletion
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <strong>Name:</strong> {user.name}, <strong>Email:</strong>{" "}
            {user.email}
            <button onClick={() => deleteUser(user._id)}>Delete</button>{" "}
            {/* Add delete button */}
          </li>
        ))}
      </ul>{" "}
    </div>
  );
};

export default AllUser;
