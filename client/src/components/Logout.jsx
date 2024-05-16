import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = ({ className }) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/logout",
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        console.error("Logout failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  return (
    <button className={className} onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
