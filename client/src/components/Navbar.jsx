import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import SiteLogo from "../assets/logo.png";
import ProfileImg from "../assets/profile.png";
import axios from "axios";
import Logout from "./Logout";
import Scrollspy from "react-scrollspy";

const Navbar = ({ id }) => {
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);

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
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`navbar py-10 z-40 px-36 mx-auto fixed top-0 transition-all ease-in-out duration-300 ${
        scrolled && "bg-white py-2"
      }`}
      id={id}
    >
      <div className="navbar-start">
        <NavLink to="/">
          <img src={SiteLogo} className="w-[100px]" alt="Site Logo" />
        </NavLink>

        <Scrollspy
          items={["home", "about", "services", "contact"]}
          currentClassName="is-current"
          className="menu menu-horizontal ms-20 font-medium"
        >
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About Us</a>
          </li>
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </Scrollspy>
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
