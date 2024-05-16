import React, { useState, useEffect } from "react";
import axios from "axios";

const PatientComponent = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleDelete = (userId) => {
    axios
      .delete(`http://localhost:3001/users/${userId}`)
      .then((response) => {
        if (response.status === 200) {
          setUsers(users.filter((user) => user._id !== userId));
        }
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  const filteredUsers = users.filter((user) => {
    const { name, email } = user;
    const searchRegex = new RegExp(searchTerm, "i");
    return name.match(searchRegex) || email.match(searchRegex);
  });

  return (
    <div className="pt-10 pb-20 ps-5 pe-20">
      <h1 className="text-4xl font-bold mb-10">All Patients</h1>
      <input
        type="text"
        placeholder="Search by name or email..."
        className="mb-4 px-3 py-2 border rounded-md"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Image</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id} className="border">
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">
                <img
                  src={user.imageUrl}
                  className="w-10 h-10 object-cover rounded-full"
                  alt=""
                />
              </td>
              <td className="border p-2">
                <button
                  onClick={() => handleDelete(user._id)}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientComponent;
