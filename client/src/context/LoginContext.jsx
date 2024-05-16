import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";
const LoginContext = createContext();

export const useLogin = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get("http://localhost:3001/user", {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setUser(response.data);
          if (response.data && response.data.userType === "admin") {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        });
    } else {
      console.log("no token found");
    }
  }, [setIsAdmin]);


  

  return (
    <LoginContext.Provider value={{ isAdmin, setUserId, userId, user }}>
      {children}
    </LoginContext.Provider>
  );
};
