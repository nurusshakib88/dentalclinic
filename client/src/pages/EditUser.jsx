// EditUser.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "", // Only if you want to update password as well
    // Add other fields you want to update
  });

  useEffect(() => {
    // Fetch the user data by id
    axios
      .get(`/api/users/${id}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the user data!", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`/api/users/${id}`, userData)
      .then((response) => {
        alert("User updated successfully!");
        navigate("/users"); // Redirect to users list or another page
      })
      .catch((error) => {
        console.error("There was an error updating the user!", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          required
        />
      </div>
      {/* Add other fields as needed */}
      <button type="submit">Update User</button>
    </form>
  );
};

export default EditUser;
