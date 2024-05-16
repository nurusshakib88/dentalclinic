import React, { useState, useEffect } from "react";
import SiteLogo from "../assets/logo.png";
import AppointmentContent from "../components/AppointmentContent";
import PatientComponent from "../components/PatientComponent";
import AddService from "./AddService";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState(() => {
    return localStorage.getItem("selectedMenu") || "Appointments";
  });

  useEffect(() => {
    localStorage.setItem("selectedMenu", selectedMenu);
  }, [selectedMenu]);

  const renderContent = () => {
    switch (selectedMenu) {
      case "Appointments":
        return <AppointmentContent />;
      case "Patients":
        return <PatientComponent />;
      case "Service":
        return <AddService />;
      case "Records":
        return <div>Records content</div>;
      case "Settings":
        return <div>Settings content</div>;

      default:
        return <div>Appointments content</div>;
    }
  };

  return (
    <div className="flex overflow-hidden gap-5">
      <div className="w-[160px] bg-gradient-to-b from-slate-400  to-orange-500 fixed h-screen p-1">
        <div className="py-5 border-b border-white mb-5">
          <NavLink to="/">
            <img src={SiteLogo} className="w-[70px] mx-auto" alt="Site Logo" />
          </NavLink>
        </div>

        <div className="dashboard-menu pt-4 flex flex-col gap-2">
          <button
            onClick={() => setSelectedMenu("Appointments")}
            className={selectedMenu === "Appointments" ? "active" : ""}
          >
            Appointments
          </button>
          <button
            onClick={() => setSelectedMenu("Patients")}
            className={selectedMenu === "Patients" ? "active" : ""}
          >
            Patients
          </button>
          <button
            onClick={() => setSelectedMenu("Service")}
            className={selectedMenu === "Service" ? "active" : ""}
          >
            Add Service
          </button>
          <button
            onClick={() => setSelectedMenu("Records")}
            className={selectedMenu === "Records" ? "active" : ""}
          >
            Records
          </button>
          <button
            onClick={() => setSelectedMenu("Settings")}
            className={selectedMenu === "Settings" ? "active" : ""}
          >
            Settings
          </button>
        </div>
      </div>

      <div className="w-full ms-[170px]">{renderContent()}</div>
    </div>
  );
};

export default Dashboard;
