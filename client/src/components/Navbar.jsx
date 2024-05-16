import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import SiteLogo from "../assets/logo.png";
import ProfileImg from "../assets/profile.png";
import axios from "axios";
import Logout from "./Logout";

const Navbar = () => {
  const [user, setUser] = useState(null);

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
        })
        .catch((error) => {
          console.log("Error fetching user data:", error);
        });
    } else {
      console.log("No token found");
    }
  }, []);

  return (
    <div className="navbar py-10 z-40">
      <div className="navbar-start">
        <NavLink to="/">
          <img src={SiteLogo} className="w-[100px]" alt="Site Logo" />
        </NavLink>
        <ul className="menu menu-horizontal ms-20 font-medium">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">About Us</Link>
          </li>
          <li>
            <Link to="/">Services</Link>
          </li>
          <li>
            <Link to="/">Contact</Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        {" "}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-circle avatar">
            {user ? (
              <img
                src={user.imageUrl != null ? user.imageUrl : ProfileImg}
                className="w-[55px] bg-primary rounded-full opacity-80"
                alt="Profile"
              />
            ) : (
              <img
                src={ProfileImg}
                className="w-[55px] p-[5px] bg-primary rounded-full opacity-80"
                alt="Profile"
              />
            )}
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-40 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            {user ? (
              <>
                {" "}
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/my-appointments">Appointments</Link>
                </li>
                <li>
                  <Logout />
                </li>
              </>
            ) : (
              <>
                {" "}
                <li>
                  <Link to="/login" className="justify-between">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
