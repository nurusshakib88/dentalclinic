import { useAppointment } from "../context/AppointmentContext";
import React, { useState, useEffect } from "react";
import axios from "axios"; // Ensure axios is imported
import Navbar from "../components/Navbar";
import { NavLink, Link } from "react-router-dom";
import SiteLogo from "../assets/logo.png";
import Logout from "../components/Logout";
import { Delete, Home } from "@mui/icons-material";
import ProfileImg from "../assets/profile.png";

const AppointmentList = () => {
  const { appointments, userId, user, setUser, loading, handleDelete } =
    useAppointment();

  const filteredAppointments = user
    ? appointments.filter((appointment) => appointment.userId === user._id)
    : [];
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
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
    <div className="min-h-screen bg-gradient-to-b from-slate-400 via-orange-300 to-orange-500">
      <div
        className={`navbar py-10 z-40 px-36 mx-auto fixed top-0 transition-all ease-in-out duration-300 ${
          scrolled && "bg-white py-2"
        }`}
      >
        <div className="navbar-start">
          <NavLink to="/">
            <img src={SiteLogo} className="w-[100px]" alt="Site Logo" />
          </NavLink>
        </div>

        <div className="navbar-end">
          <div className="flex items-center gap-5">
            <Link to="/" className="w-12 h-12 btn btn-circle avatar bg-primary">
              <Home sx={{ fontSize: "30px" }} />
            </Link>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-circle w-12 h-12 bg-primary"
              >
                <img
                  src={user ? user.imageUrl : ProfileImg}
                  className="rounded-full opacity-80"
                  alt="Profile"
                />
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-40 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
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
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="px-36 pt-52">
        <h1 className="text-4xl font-bold mb-10">My Appointments</h1>
        <div className="grid grid-cols-6 mb-2 gap-5 items-center bg-white p-5 rounded-xl font-bold">
          <h3>Time</h3>
          <h3>Patient</h3>
          <h3>Service</h3>
          <h3>Request</h3>
          <h3>Status</h3>
          <h3>Action</h3>
        </div>
        {user && !loading ? (
          filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => (
              <div
                key={appointment._id}
                className="grid grid-cols-6 mb-2 gap-5 items-center bg-white p-5 rounded-xl overflow-hidden"
              >
                <h3>{appointment.time}</h3>
                <h3>{appointment.patientName}</h3>
                <p>{appointment.service}</p>
                <h2 className="max-h-[50px] text-clip overflow-hidden">
                  {appointment.msg}
                </h2>
                <p>{appointment.status}</p>
                <button
                  type="button"
                  onClick={() => handleDelete(appointment._id)}
                  className="btn btn-circle btn-error"
                >
                  <Delete />
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-5 text-center bg-white p-5 rounded-xl">
              No appointments found
            </div>
          )
        ) : (
          <div className="col-span-5 text-center bg-white p-5 rounded-xl">
            Loading...
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentList;
